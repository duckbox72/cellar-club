from django.contrib.auth import authenticate, login, logout
# from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
#from django.shortcuts import render
#from django.urls import reverse

# generics classes from a generic view, access to HTTP status codes
from rest_framework import generics, serializers, status 
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Lwin, Sample, User
from .serializers import *

import pandas as pd 

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


class GetLwin(APIView):
    serializer_class = LwinSerializer
    lookup_url_kwarg = 'display_name'

    def get(self, request, format=None):
        display_name = request.GET.get(self.lookup_url_kwarg)

        results = Lwin.objects.filter(display_name__contains=display_name)
        results = results[:10]

        return JsonResponse([result.serialize() for result in results], safe=False, status=status.HTTP_200_OK)
    

class CreateLwinView(APIView):
    serializer_class = CreateLwinSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            lwin = serializer.data['lwin']
            display_name = serializer.data['display_name']
            producer_title = serializer.data['producer_title']
            producer_name = serializer.data['producer_name']
            wine = serializer.data['wine']
            country = serializer.data['country']
            region = serializer.data['region']
            sub_region = serializer.data['sub_region']
            site = serializer.data['site']
            parcel = serializer.data['parcel']
            colour = serializer.data['colour']
            type = serializer.data['type']
            sub_type = serializer.data['sub_type']
            designation = serializer.data['designation']
            classification = serializer.data['classification']
            vintage_cofig = serializer.data['vintage_config']
            first_vintage = serializer.data['first_vintage']
            last_vintage = serializer.data['last_vintage']
            reference = serializer.data['reference']

            lwin = Lwin(lwin=lwin, display_name=display_name,producer_title=producer_title, producer_name=producer_name,
                        wine=wine, country=country, region=region, sub_region=sub_region, site=site, parcel=parcel,
                        colour=colour, type=type, sub_type=sub_type, designation=designation, classification=classification,
                        vintage_cofig=vintage_cofig, first_vintage=first_vintage, last_vintage=last_vintage, reference=reference)
            lwin.save()

            return Response(data=CreateLwinSerializer(lwin).data, status=status.HTTP_201_CREATED)
        
        else:
            return Response({'Bad Request': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


# --------------------------- AUTH ROUTES --------------------------- 
def is_authenticated_view(request):

    print('is_authenticated_view was CALLED')

    if request.user.is_authenticated:
        return JsonResponse({"is_authenticated": True})
    else:
        return JsonResponse({"is_authenticated": False})


def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication is sucessfull
        if user is not None:
            login(request, user)
            return JsonResponse({"success": "User logged in"})
        else:
            return JsonResponse({"message": "Invalid username and/or password."})
    else:
        return JsonResponse({"error": "Invalid request method"})


def logout_view(request):
    logout(request)
    return JsonResponse({"success": "User logged out"})


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return JsonResponse({"message": "Passwords must match."})

        # Attempt to create new user
        try: 
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return JsonResponse({"message": "Username not available."})

        login(request, user)
        return JsonResponse({"success": "User registered."})

    else:    
        return JsonResponse({"error": "Invalid request method"})