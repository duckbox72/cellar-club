from django.db import models

# Create your models here.
class Sample(models.Model):
    a = models.CharField(max_length=8)
    b = models.CharField(max_length=64)
    c = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)


class Lwin(models.Model):
    lwin = models.CharField(max_length=8, blank=False, null=False)
    display_name = models.CharField(max_length=256)
    producer_title = models.CharField(max_length=64)
    producer_name = models.CharField(max_length=64)
    wine = models.CharField(max_length=64)
    country = models.CharField(max_length=64)
    region = models.CharField(max_length=64)
    sub_region = models.CharField(max_length=64)
    site = models.CharField(max_length=64)
    parcel = models.CharField(max_length=64)
    colour = models.CharField(max_length=16)
    type = models.CharField(max_length=64)
    sub_type = models.CharField(max_length=64)
    designation = models.CharField(max_length=16)
    classification = models.CharField(max_length=64)
    vintage_config = models.CharField(max_length=16)
    first_vintage = models.CharField(max_length=4)
    last_vintage = models.CharField(max_length=4)
    reference = models.CharField(max_length=7)
    

