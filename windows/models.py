from django.db import models


class Window(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True,
        help_text="Url friendly title. Leaving it in blank will be autogenerated, but if defined must be unique."
    )
    description = models.CharField(max_length=256, blank=True)