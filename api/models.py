from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.expressions import F
from django.db.models.fields import DateField, NOT_PROVIDED
from django.utils import timezone


class User(AbstractUser):
    photo = models.ImageField(upload_to='static', blank=True)
    pass


class Lwin(models.Model):
    lwin = models.CharField(max_length=7) # , unique=True)
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
    binname = models.CharField(max_length=64, null=False, blank=False)

    def serializer(self):
        return {
            "binname": self.binname,
        }


class Bottle(models.Model):
    # gathered data
    user = models.ForeignKey("User", on_delete=models.CASCADE, null=False, blank=False)
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
    note = models.CharField(max_length=256, null=True, blank=True)
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
        
        # Return cellarname if cellar exists
        if self.cellar:
            cellarname = self.cellar.cellarname
        else:
            cellarname = None

        # Return binname if bin exists
        if self.bin:
            binname = self.bin.binname
        else:
            binname = None

        return {
            "id": self.id,
            "cellar": cellarname,
            "bin": binname,
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


class Consumption(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, null=False, blank=False)
    bottle = models.ForeignKey("Bottle", on_delete=models.CASCADE, null=False, blank=False)
    date_consumed = models.DateField(default=timezone.now)
    reason = models.CharField(max_length=64, null=False, blank=False)
    private_note = models.CharField(max_length=256, null=True, blank=True)
    gathered = models.IntegerField(default=0, null=True, blank=True)
    permanently_deleted = models.BooleanField(default=False)
    has_review = models.BooleanField(default=False)


    def serializer(self):

        return {
            "id": self.id,
            "bottle": self.bottle.serializer(),
            "date_consumed": self.date_consumed,
            "reason": self.reason,
            "private_note": self.private_note,
            "gathered": self.gathered,
            "has_review": self.has_review,
            "permanently_deleted": self.permanently_deleted,
        }
        

class Review(models.Model):
    user = models.ForeignKey("User", on_delete=models.CASCADE, null=False, blank=False)
    date_tasted = models.DateField(default=timezone.now, null=True, blank=True)
    
    # Case review comes from a collection bottle
    bottle = models.ForeignKey("Bottle", on_delete=models.DO_NOTHING, null=True, blank=True)
    
    # Case review comes from a non collection bottle
    lwin_lwin = models.CharField(max_length=7, null=True, blank=True)
    lwin_vintage = models.CharField(max_length=4, null=True, blank=True)
    lwin_display_name = models.CharField(max_length=256, null=True, blank=True)
    lwin_colour = models.CharField(max_length=16, null=True, blank=True)

    is_public = models.BooleanField(default=True)
    like_status = models.CharField(max_length=64, default='like')
    score = models.CharField(max_length=3, null=True, blank=True)
    tasting_note = models.CharField(max_length=512, null=True, blank=True)
    
    def serializer(self):
        if self.bottle:
            bottle = self.bottle.serializer()


        return {
            "id": self.id,
            "date_tasted": self.date_tasted,

            "bottle": bottle,
            
            "lwin_lwin": self.lwin_lwin,
            "lwin_display_name": self.lwin_display_name,
            "lwin_vintage": self.lwin_vintage,
            "lwin_colour": self.lwin_colour,


            "is_public": self.is_public,
            "like_status": self.like_status,
            "score": self.score,
            "tasting_note": self.tasting_note,     
        }
