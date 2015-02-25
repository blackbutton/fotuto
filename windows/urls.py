from django.conf.urls import patterns, include, url
from django.views.generic import ListView
from windows.models import Window
from windows.views import WindowDetailView, WindowCreateView

urlpatterns = patterns('',
    url(r'^$', WindowDetailView.as_view(), name="mimics"),
    url(r'^windows/add/$', WindowCreateView.as_view(), name="window_add"),
    url(r'^windows/$', ListView.as_view(model=Window), name="window_list"),
)