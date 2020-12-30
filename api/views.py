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
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            
            a = serializer.data['a']
            b = serializer.data['b']
            c = serializer.data['c']
        
            sample = Sample(a=a, b=b, c=c)
            sample.save()
            
            return Response(CreateSampleSerializer(sample).data, status=status.HTTP_201_CREATED)

        else:
            return Response({'Bad Request': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)