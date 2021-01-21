from rest_framework import fields, serializers
from .models import Lwin, Sample

# GET request serializer (serializes response)
class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ('id', 'a', 'b', 'c', 'created')


# POST request serializer (serializes request)
class CreateSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ('a', 'b', 'c')

# GET request serializer (serializes response)
class LwinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lwin
        fields = ('lwin', 'display_name', 'producer_title', 'producer_name', 'wine', 'country', 'region', 'sub_region', 'site', 'parcel', 'colour', 'type', 'sub_type', 'designation', 'classification', 'vintage_config', 'first_vintage', 'last_vintage', 'reference')
    

# POST request serializer (serializes response)
class CreateLwinSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lwin
        fields = ('lwin', 'display_name', 'producer_title', 'producer_name', 'wine', 'country', 'region', 'sub_region', 'site', 'parcel', 'colour', 'type', 'sub_type', 'designation', 'classification', 'vintage_config', 'first_vintage', 'last_vintage', 'reference')
