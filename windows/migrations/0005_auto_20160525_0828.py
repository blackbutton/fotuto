# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-05-25 13:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('windows', '0004_auto_20160513_0903'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='window',
            options={'ordering': ('order',)},
        ),
        migrations.AddField(
            model_name='window',
            name='order',
            field=models.SmallIntegerField(blank=True, default=0, null=True),
        ),
    ]
