# Generated by Django 3.1.5 on 2021-03-25 17:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0013_auto_20210325_0320'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bottle',
            name='lwin',
            field=models.CharField(blank=True, max_length=7, null=True),
        ),
    ]
