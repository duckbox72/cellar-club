# Generated by Django 3.1.5 on 2021-03-24 23:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_auto_20210324_2342'),
    ]

    operations = [
        migrations.RenameField(
            model_name='bottle',
            old_name='gws',
            new_name='score',
        ),
    ]