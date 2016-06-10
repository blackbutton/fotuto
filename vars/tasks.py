from __future__ import absolute_import

from fotuto.celery import app
from vars.models import Var


@app.task(name='tasks.read_vars')
def read_vars():
    """Send read request message to remote device and wait for response, then update values"""
    var = Var.objects.get(slug__startswith='turn')
    var.value = (var.value + 1) % 2
    var.save()
