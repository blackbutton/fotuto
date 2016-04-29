from django.db import models
from vars.models import Var
from windows.models import Window


class Mimic(models.Model):
    """A human friendly group of vars in a :class:`~windows.models.Window`."""
    TYPE_CHOICES = (
        ('svg', "SVG"),
    )

    name = models.CharField(max_length=50, blank=True)
    vars = models.ManyToManyField(Var, blank=True, through='MimicVar')
    window = models.ForeignKey(Window, related_name='mimics')
    x = models.SmallIntegerField(null=True, blank=True, default=0)
    y = models.SmallIntegerField(null=True, blank=True, default=0)
    width = models.SmallIntegerField(default=160)
    height = models.SmallIntegerField(default=210)
    graphic_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default=TYPE_CHOICES[0][0])
    graphic = models.TextField(blank=True, help_text="Static graphic")
    description = models.TextField(max_length=255, blank=True)

    def __unicode__(self):
        return self.name


class MimicVar(models.Model):
    """Definition of changes of the variable and its graphic representation in the ``Mimic``"""
    mimic = models.ForeignKey(Mimic)
    var = models.ForeignKey(Var)
    max = models.FloatField(null=True, blank=True, help_text="Maximum var's value to represent")
    min = models.FloatField(null=True, blank=True, help_text="Minimum var's value to represent")
    graphic = models.TextField(blank=True,
        help_text="Dynamic graphic to represent change in the variable, in case of svg code, tag should contain the "
                  "attribute class with the name of the variable"
    )
    rules = models.ManyToManyField('Rule', blank=True, null=True,
        help_text="List of rules to apply in order to change the graphic according variable change"
    )
    description = models.TextField(max_length=255, blank=True)


class Rule(models.Model):
    """A formula to calculate an attribute value given the variable value"""
    attr = models.CharField(max_length=50, help_text="Attribute to modify")
    operation = models.TextField(max_length=300, default="return value;",
        help_text="JavaScript function content returning the result to assign to the attribute, if the function require"
                  " params define it in the params field, for multiple sentences be sure to add an `;`"
    )
    params = models.CharField(max_length=255, blank=True, default="value",
        help_text="A comma separated list of params to pass to the function with content specified in operation field"
    )
    description = models.TextField(max_length=255, blank=True)

    def __unicode__(self):
        if self.description:
            return self.description[:50]
        else:
            return "Rule for {}".format(self.attr)
