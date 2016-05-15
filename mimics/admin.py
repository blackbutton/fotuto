from django.contrib import admin
from mimics.models import Mimic, MimicVar, Rule


class MimicVarInline(admin.TabularInline):
    model = MimicVar


class MimicAdmin(admin.ModelAdmin):
    list_display = ('name', 'window', 'x', 'y', 'width', 'height', 'graphic_type')
    filter_horizontal = ('vars', 'rules')
    inlines = (MimicVarInline,)

admin.site.register(Mimic, MimicAdmin)
admin.site.register(MimicVar)
admin.site.register(Rule)
