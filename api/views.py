from django.shortcuts import render

# generics classes from a generic view, access to HTTP status codes
from rest_framework import generics, serializers, status 
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Sample
from .serializers import *

class SampleView(generics.ListAPIView):
    queryset = Sample.objects.all()
    serializer_class = SampleSerializer


class CreateSampleView(APIView):
    serializer_class = CreateSampleSerializer

    def post(self, request, format=None):
        pass
    
