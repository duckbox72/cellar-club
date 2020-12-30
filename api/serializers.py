from rest_framework import fields, serializers
from .models import Sample

# GET request serializer (serializes response)
class SampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ('id', 'a', 'b', 'c')


# POST request serializer (serializes request)
class CreateSampleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sample
        fields = ('a', 'b', 'c')
