from rest_framework import serializers
from rest_framework.reverse import reverse as drf_reverse

from vars.models import Var
from vars.serializers import VarSerializer
from .models import Mimic, MimicVar, Rule


class MimicPostSerializer(serializers.ModelSerializer):
    vars = serializers.PrimaryKeyRelatedField(many=True, queryset=Var.objects.all())

    class Meta:
        model = Mimic
        fields = ('id', 'name', 'window', 'vars', 'graphic', 'x', 'y')


class RuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rule


class MimicVarSerializer(serializers.ModelSerializer):
    rules = RuleSerializer(many=True)

    class Meta:
        model = MimicVar


class MimicSerializer(serializers.ModelSerializer):
    vars = VarSerializer(many=True, read_only=True)
    var_rules = MimicVarSerializer(source='mimicvar_set', many=True)
    links = serializers.SerializerMethodField()

    class Meta:
        model = Mimic

    def get_links(self, obj):
        request = self.context['request']
        return {
            'self': drf_reverse('mimic-detail', kwargs={'pk': obj.pk}, request=request),
            'window': drf_reverse('window-detail', kwargs={'pk': obj.window.pk}, request=request),
            'vars': drf_reverse('var-list', request=request) + '?mimic=%s' % format(obj.pk),
        }
