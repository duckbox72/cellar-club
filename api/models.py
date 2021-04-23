from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    photo = models.ImageField(upload_to='static', blank=True)
    pass


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


class Cellar(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    cellarname = models.CharField(max_length=64, null=False, blank=False, unique=True)

    def serializer(self):
        return {
            "cellarname": self.cellarname,
        }


class Bin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False)
    cellar = models.ForeignKey(Cellar, on_delete=models.CASCADE, null=False, blank=False)
    binname = models.CharField(max_length=64, null=False, blank=False, unique=True)

    def serializer(self):
        return {
            "binname": self.binname,
        }


class Bottle(models.Model):
    # retrieved data
    user = models.ForeignKey("User", on_delete=models.CASCADE, null=False, blank=False)
    # cellar = models.CharField(max_length=64, null=True, blank=True)
    # bin = models.CharField(max_length=64, null=True, blank=True)
    cellar = models.ForeignKey("Cellar", on_delete=models.DO_NOTHING, null=True, blank=True)
    bin = models.ForeignKey("Bin", on_delete=models.DO_NOTHING, null=True, blank=True)

    score = models.CharField(max_length=6, null=True, blank=True)
    

    lwin = models.CharField(max_length=7, null=True, blank=True)
    display_name = models.CharField(max_length=256, null=False, blank=False)
    producer_title = models.CharField(max_length=64, null=True, blank=True)
    producer_name = models.CharField(max_length=64,null=True, blank=True)
    country = models.CharField(max_length=64, null=True, blank=True)
    region = models.CharField(max_length=64, null=True, blank=True)
    sub_region = models.CharField(max_length=64, null=True, blank=True)
    colour = models.CharField(max_length=16, null=True, blank=True)

    # data entered by user
    vintage = models.CharField(max_length=4)
    size = models.CharField(max_length=8)
    store = models.CharField(max_length=64, null=True, blank=True)
    cost = models.IntegerField(default=0, null=True, blank=True)
    note = models.CharField(max_length=128, null=True, blank=True)
    consumed = models.BooleanField(default=False)
    favorite = models.BooleanField(default=False)

    # auto entered data
    lwin11 = models.CharField(max_length=11,null=True, blank=True)
    date_added = models.DateField(default=timezone.now, null=True, blank=True)
    created = models.DateTimeField(default=timezone.now)

    def mini_serializer(self):
        return {
            "display_name": self.display_name,
        }
    
    def serializer(self):
        return {
            "id": self.id,
            "cellar": self.cellar,
            "bin": self.bin,
            "score": self.score,
            "lwin": self.lwin,
            "display_name": self.display_name,
            "producer_title": self.producer_title,
            "producer_name": self.producer_name,
            "country": self.country,
            "region": self.region,
            "sub_region": self.sub_region,
            "colour": self.colour,
            "vintage": self.vintage,
            "size": self.size,
            "store": self.store,
            "cost": self.cost,
            "note": self.note,
            "lwin11": self.lwin11,
            "date_added": self.date_added,
            "created": self.created,
            "consumed": self.consumed,
            "favorite": self.favorite,
        }



    

