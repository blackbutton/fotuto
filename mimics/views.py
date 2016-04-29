from django.contrib.messages.views import SuccessMessageMixin
from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404
from django.views.generic import CreateView
from rest_framework import viewsets

from .forms import MimicManageForm
from .models import Mimic, MimicVar
from .serializers import MimicSerializer, MimicPostSerializer, MimicVarSerializer
from windows.models import Window


class MimicManageView(SuccessMessageMixin, CreateView):
    model = Mimic
    template_name = 'mimics/mimic_manage_form.html'
    success_message = "Mimic was added."
    form_class = MimicManageForm

    def get_success_url(self):
        return reverse('mimic_manage_window', args=(self.window.slug,))

    def get_initial(self):
        """
        Add window field.
        """
        initial = self.initial.copy()
        self.window = get_object_or_404(Window, slug=self.kwargs.get('window'))
        initial['window'] = self.window.pk
        return initial

    def get_context_data(self, **kwargs):
        context = super(MimicManageView, self).get_context_data(**kwargs)
        context['window'] = self.window
        return context


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
