# Generated by Django 3.1.5 on 2021-05-06 01:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20210503_1849'),
    ]

    operations = [
        migrations.AddField(
            model_name='review',
            name='lwin_colour',
            field=models.CharField(blank=True, max_length=16, null=True),
        ),
        migrations.AddField(
            model_name='review',
            name='lwin_display_name',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
