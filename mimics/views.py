from rest_framework import viewsets

from .models import Mimic, MimicVar
from .serializers import MimicSerializer, MimicPostSerializer, MimicVarSerializer


class MimicViewSet(viewsets.ModelViewSet):
    queryset = Mimic.objects.all()
    filter_fields = ('window',)

    def get_serializer_class(self):
        if self.action in ('create', 'update'):
            return MimicPostSerializer
        else:
            return MimicSerializer


class MimicVarViewSet(viewsets.ModelViewSet):
    serializer_class = MimicVarSerializer
    queryset = MimicVar.objects.all()
    filter_fields = ('mimic',)
