from .serializers import SampleSerializer
from .models import Sample
from django.shortcuts import render
from rest_framework import generics   # creates a class from a generic API view

from .models import Sample
from .serializers import SampleSerializer

# Create your views here.

class SampleView(generics.ListAPIView):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer
    
