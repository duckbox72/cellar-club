from django.contrib.auth.models import AbstractUser
from django.db import models
#from django.utils import timezone

# Create your models here.
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
    

