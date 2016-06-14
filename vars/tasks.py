from __future__ import absolute_import

import binascii
import serial
import struct
from celery.utils.log import get_task_logger
from xbee import DigiMesh

from fotuto.celery import app
from vars.models import Var, Device

PORT = '/dev/ttyUSB0'
BAUD_RATE = 9600
READ_REQUEST = 1
READ_RESPONSE = 2
logger = get_task_logger(__name__)


# TODO: Move this function to xbee protocol module
def bytes2human(bytes):
    """Generate a string of human readable hexs from a bytearray"""
    return binascii.hexlify(bytes).upper()


# Queue of sent messages
sent_messages = []  # TODO: Use python Queue


def message_received(data):
    global sent_messages
    logger.info(data)

    # Extract message id and type
    msg_id, msg_type = struct.unpack('HB', data['data'][0:3])
    # Discard not read response messages
    if msg_type != READ_RESPONSE:
        return

    # Process message_id
    if msg_id in sent_messages:
        sent_messages.pop(sent_messages.index(msg_id))

    device_address = bytes2human(data['source_addr'])
    # TODO: Why source_address don't have first two chars? check it and then remove ``__endswith`` in next line
    device = Device.objects.get(address__endswith=device_address)
    var_ids = device.get_var_order()
    seek = 3  # Seek in 3rd byte because message id and message type
    while seek < len(data['data']) - 1:
        packet_var_id = ord(data['data'][seek])
        seek += 1  # move 1 byte for var id
        try:
            var_id = var_ids[packet_var_id]
        except IndexError:
            # TODO: Add log if var_id is None (Or maybe allow to configure an alarm for this)
            continue
        var = Var.objects.get(pk=var_id)
        values_amount = ord(data['data'][seek])
        seek += 1  # move 1 byte for values amount
        # Iterate by values
        for i in range(values_amount):
            value_len = struct.calcsize(var.var_type)  # Calculate value size
            value_end = seek + 4 + value_len  # 4 is the length of the timestamp (int)
            timestamp, value = struct.unpack('<I' + var.var_type, data['data'][seek:value_end])
            var.value = value
            var.save()
            seek = value_end


@app.task(name='tasks.read_vars')
def read_vars():
    """Send read request message to remote device and wait for response, then update values"""
    global sent_messages
    serial_port = serial.Serial(PORT, BAUD_RATE)
    xbee = DigiMesh(serial_port, escaped=True)  # , callback=message_received

    # Send read request message
    # TODO: Broadcast?
    for device in Device.objects.filter(active=True):
        if sent_messages:
            sent_messages.sort()
            message_id = sent_messages[-1] + 1
        else:
            message_id = 1

        logger.info('Sending message to device %s', device.slug)
        msg_request = struct.pack('HB', message_id, READ_REQUEST)
        try:
            xbee.tx(dest_addr=bytearray.fromhex(device.address), data=msg_request)
        except ValueError as e:
            logger.error("Message not sent to device %s", device.slug, exc_info=1)
        else:
            # Add message id to queue
            sent_messages.append(message_id)
    while sent_messages:
        # TODO: Why using callback function not working
        packet = xbee.wait_read_frame()
        message_received(packet)
        break  # TODO: Implement something to clean sent_messages queue and remove this break
    serial_port.close()
