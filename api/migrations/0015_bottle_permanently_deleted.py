# Generated by Django 3.1.5 on 2021-05-18 21:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_bottle_sub_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='bottle',
            name='permanently_deleted',
            field=models.BooleanField(default=False),
        ),
    ]
