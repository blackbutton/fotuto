from rest_framework import viewsets

from .models import Var, Device
from .serializers import DeviceSerializer, VarSerializer


class DeviceViewSet(viewsets.ModelViewSet):
    queryset = Device.objects.all()
    serializer_class = DeviceSerializer


class VarViewSet(viewsets.ModelViewSet):
    queryset = Var.objects.all()
    serializer_class = VarSerializer
    filter_fields = ('device', 'mimic', 'mimic__window')
