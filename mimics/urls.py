from django.conf.urls import include, url
from rest_framework import routers

from .views import MimicViewSet, MimicVarViewSet

router = routers.DefaultRouter()
router.register(r'mimics', MimicViewSet)
router.register(r'var_rules', MimicVarViewSet)

urlpatterns = [
    url(r'^api/', include(router.urls)),
]
