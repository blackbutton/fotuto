# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-16 16:25
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vars', '0007_auto_20160314_2117'),
    ]

    operations = [
        migrations.AlterField(
            model_name='var',
            name='var_type',
            field=models.CharField(blank=True, choices=[(b'binary', b'Digital'), (b'real', b'Analog')], default=b'binary', max_length=10, verbose_name=b'Type'),
        ),
    ]
