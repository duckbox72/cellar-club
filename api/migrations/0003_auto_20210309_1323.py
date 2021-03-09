# Generated by Django 3.1.5 on 2021-03-09 13:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_bottle_bottlesize_location_vintage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bottle',
            name='location',
        ),
        migrations.RemoveField(
            model_name='bottle',
            name='lwin',
        ),
        migrations.AddField(
            model_name='bottle',
            name='bin',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='cellar',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='colour',
            field=models.CharField(default='', max_length=16),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='country',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='display_name',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='lwin7',
            field=models.CharField(default='', max_length=7),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='producer_name',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='producer_title',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='region',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='bottle',
            name='size',
            field=models.CharField(default='', max_length=8),
            preserve_default=False,
        ),
    ]
