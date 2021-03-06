# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-14 21:15
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vars', '0005_auto_20150307_1723'),
    ]

    operations = [
        migrations.AlterField(
            model_name='device',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='device',
            name='slug',
            field=models.SlugField(help_text=b'Url friendly name. Leaving it in blank will be autogenerated, but if defined must be unique.', max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='var',
            name='name',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='var',
            name='slug',
            field=models.SlugField(help_text=b'Url friendly name. Leaving it in blank will be autogenerated, but if defined must be unique.', max_length=100, unique=True),
        ),
    ]
