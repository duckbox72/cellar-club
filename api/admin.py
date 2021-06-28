from django.contrib import admin
from . models import *

# Register your models here.
admin.site.register(User)
admin.site.register(Lwin)
admin.site.register(Bottle)
admin.site.register(Cellar)
admin.site.register(Bin)
admin.site.register(Consumption)
admin.site.register(Review)

