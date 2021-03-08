from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    photo = models.ImageField(upload_to='static', blank=True)
    pass


class Location(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cellar = models.CharField(max_length=64)
    bin = models.CharField(max_length=64)
    

    def serializer(self):
        return {
            "user_id": self.user_id,
            "cellar": self.cellarname,
            "bin": self.bin,
        }


class BottleSize(models.Model):
    size = models.CharField(max_length=8)

    def serializer(self):    
        return {
            "size": self.size,
        }


class Vintage(models.Model):
    vintage = models.CharField(max_length=4) 

    def serializer(self):
        return {
            "vintage": self.vintage
        }


class Bottle(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE)
    location = models.ForeignKey("Location", on_delete=models.SET_NULL, null=True, blank=True)
    lwin = models.ForeignKey("Lwin", on_delete=models.SET_NULL, null=True, blank=True)
    vintage = models.CharField(max_length=4)
    gws = models.CharField(max_length=6)
    store = models.CharField(max_length=64)
    cost = models.IntegerField(default=0)
    note = models.CharField(max_length=128)
    date_added = models.DateTimeField(default=timezone.now)
    consumed = models.BooleanField(default=False)

    def serializer(self):
        return {
            "user": self.user,
            "cellar": self.cellar,
            "bin": self.bin,
            "lwin": self.lwin,
            "vintage": self.vintage,
            "gws": self.gws,
            "store": self.store,
            "cost": self.cost,
            "note": self.note,
            "date_added": self.date_added,
        }


class Lwin(models.Model):
    lwin = models.CharField(max_length=8, blank=False, null=False, unique=True)
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
    final_vintage = models.CharField(max_length=4)
    reference = models.CharField(max_length=7)

    def mini_serializer(self):
        return {
            "display_name": self.display_name,
            "lwin": self.lwin
        }
    
    def serializer(self):
        return {
            "id": self.id,
            "lwin": self.lwin,
            "display_name": self.display_name,
            "producer_title": self.producer_title,
            "producer_name": self.producer_name,
            "wine": self.wine,
            "country": self.country,
            "region": self.region,
            "sub_region": self.sub_region,
            "site": self.site,
            "parcel": self.parcel, 
            "colour": self.colour,
            "type": self.type, 
            "sub_type":self.sub_type, 
            "designation": self.designation, 
            "classification": self.classification,
        }
    

