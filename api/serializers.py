from rest_framework import fields, serializers
from .models import Lwin, User

# GET request serializer (serializes response)
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'date_joined')
        

# GET request serializer (serializes response)
#class SearchLwinSerializer(serializers.ModelSerializer):
#    class Meta:
#        model = Lwin
#        fields = ('id','lwin', 'display_name', 'producer_title', 'producer_name', 'wine', 'country', 'region', 'sub_region', 'site', 'parcel', 'colour', 'type', 'sub_type', 'designation', 'classification', 'vintage_config', 'first_vintage', 'final_vintage', 'reference')
    

# POST request serializer (serializes response)
class CreateLwinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lwin
        fields = ('lwin', 'display_name', 'producer_title', 'producer_name', 'wine', 'country', 'region', 'sub_region', 'site', 'parcel', 'colour', 'type', 'sub_type', 'designation', 'classification', 'vintage_config', 'first_vintage', 'final_vintage', 'reference')
