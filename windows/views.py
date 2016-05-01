from rest_framework import viewsets

from .models import Window
from .serializers import WindowSerializer


class WindowViewSet(viewsets.ModelViewSet):
    queryset = Window.objects.all()
    serializer_class = WindowSerializer
