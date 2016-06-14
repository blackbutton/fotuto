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

logger = get_task_logger(__name__)


# TODO: Move this function to xbee protocol module
def bytes2human(bytes):
    """Generate a string of human readable hexs from a bytearray"""
    return binascii.hexlify(bytes).upper()

@app.task(name='tasks.read_vars')
def read_vars():
    """Send read request message to remote device and wait for response, then update values"""
    # Queue of sent messages
    sent_messages = []  # TODO: Use python Queue
    serial_port = serial.Serial(PORT, BAUD_RATE)
    xbee = DigiMesh(serial_port, escaped=True)

    # Send read request message
    # TODO: Broadcast?
    for device in Device.objects.filter(active=True):
        if sent_messages:
            sent_messages.sort()
            message_id = sent_messages[-1] + 1
        else:
            message_id = 1

        logger.info('Sending message to device %s', device.slug)
        # TODO: Add message id to queue
        sent_messages.append(message_id)
        message_type = 1  # read_requeset
        msg_request = bytearray(chr(message_id) + chr(message_type))
        try:
            xbee.tx(dest_addr=bytearray.fromhex(device.address), data=msg_request)
        except ValueError as e:
            logger.error("Message not sent to device %s", device.slug, exc_info=1)
    while True:
        packet = xbee.wait_read_frame()
        logger.info(packet)
        # TODO: Process message_id
        if ord(packet['data'][1]) == 2:  # READ_RESPONSE
            device_address = bytes2human(packet['source_addr'])
            # TODO: Why source_address don't have first two chars? check it and then remove ``__endswith`` in next line
            device = Device.objects.get(address__endswith=device_address)
            var_ids = device.get_var_order()
            seek = 2  # Start in 2nd byte because message id and message type
            while seek < len(packet['data']) - 1:
                packet_var_id = ord(packet['data'][seek])
                seek += 1  # move 1 byte for var id
                try:
                    var_id = var_ids[packet_var_id]
                except IndexError:
                    # TODO: Add log if var_id is None (Or maybe allow to configure an alarm for this)
                    continue
                var = Var.objects.get(pk=var_id)
                values_amount = ord(packet['data'][seek])
                seek += 1  # move 1 byte for values amount
                # Iterate by values
                for i in xrange(values_amount):
                    value_len = struct.calcsize(var.var_type)  # Calculate value size
                    value_end = seek + 4 + value_len  # 4 is the length of the timestamp (int)
                    timestamp, value = struct.unpack('<I' + var.var_type, packet['data'][seek:value_end])
                    var.value = value
                    var.save()
                    seek = value_end
        serial_port.close()
        break

    # var = Var.objects.get(slug__startswith='turn')
    # var.value = (var.value + 1) % 2
    # var.save()
