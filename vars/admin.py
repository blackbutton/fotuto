from django.contrib import admin
from .models import Var, Device


class VarAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', '_order', 'active', 'device', 'var_type', 'value', 'units')
    # TODO: list_editable = ('_order',)


class DeviceAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'active', 'model', 'address')
    list_filter = ('active', 'model')

admin.site.register(Device, DeviceAdmin)
admin.site.register(Var, VarAdmin)
