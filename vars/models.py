from django.db import models


class Device(models.Model):
    name = models.CharField(max_length=20)
    slug = models.SlugField(max_length=25, unique=True,
        help_text="Url friendly name. Leaving it in blank will be autogenerated, but if defined must be unique."
    )
    active = models.BooleanField(default=True)
    model = models.CharField(max_length=10, blank=True)
    address = models.CharField(max_length=16, unique=True)
    description = models.CharField(max_length=255, blank=True)

    class Meta:
        ordering = ('pk',)

    def __unicode__(self):
        return self.name


class Var(models.Model):
    TYPE_CHOCES = (
        ('binary', "Binary"),
        ('real', "Real"),
    )
    name = models.CharField(max_length=20)
    slug = models.SlugField(max_length=25, unique=True,
        help_text="Url friendly name. Leaving it in blank will be autogenerated, but if defined must be unique."
    )
    active = models.BooleanField(default=True)
    device = models.ForeignKey(Device, related_name="vars")
    var_type = models.CharField("Type", max_length=10, blank=True, choices=TYPE_CHOCES, default=TYPE_CHOCES[0][0])
    units = models.CharField(max_length=10, blank=True)
    value = models.FloatField(blank=True, null=True, default=0)
    description = models.CharField(max_length=255, blank=True)
    # TODO: Add magnitude

    def __unicode__(self):
        return '[%s] %s' % (self.device.slug, self.name)