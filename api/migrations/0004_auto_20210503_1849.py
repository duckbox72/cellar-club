# Generated by Django 3.1.5 on 2021-05-03 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210502_2340'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bottle',
            name='note',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
        migrations.AlterField(
            model_name='consumption',
            name='private_note',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]
