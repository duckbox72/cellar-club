# Generated by Django 3.1.5 on 2021-05-02 23:40

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20210502_2256'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bottle',
            name='date_added',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
        migrations.AlterField(
            model_name='consumption',
            name='date_consumed',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='review',
            name='date_tasted',
            field=models.DateField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
