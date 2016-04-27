from importlib import import_module
from django.conf.urls import include, url
from django.contrib import admin
from django.utils.text import slugify
from rest_framework.authtoken import views

from windows.views import api_root
try:
    from settings_local import ADDITIONAL_APPS
except ImportError:
    ADDITIONAL_APPS = []

admin.site.site_title = "Fotuto Admin Site"
admin.site.site_header = "Fotuto administration"
admin.site.index_title = "Fotuto administration"

urlpatterns = [
    url(r'^api/token/', views.obtain_auth_token, name='api-token'),
    url(r'^api/$', api_root),
    url(r'^api/', include('rest_framework.urls', namespace='rest_framework')),

    url(r'^', include('django.contrib.auth.urls')),
    url(r'^', include('operators.urls')),
    url(r'^', include('windows.urls')),
    url(r'^', include('mimics.urls')),
    url(r'^', include('vars.urls')),
    url(r'^admin/', include(admin.site.urls)),
]

# Dynamically add urls from extensions
# TODO: Add a unittest for this
for app in ADDITIONAL_APPS:
    # TODO: check it hasn't included yet
    url_module = '{}.urls'.format(app)
    try:
        import_module(url_module)
        # possibly cleanup the after the imported module?
        # might fuss up the `include(...)` or leave a polluted namespace
    except:
        # cleanup after module import if fails,
        #  maybe you can let the `include(...)` report failures
        pass
    else:
        url_regex = r'^add-on/{}/'.format(slugify(app))
        urlpatterns += [url(url_regex, include(url_module, app_name=app, namespace=app))]
