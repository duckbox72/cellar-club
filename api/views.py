import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import render
#from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

# generics classes from a generic view, access to HTTP status codes
from rest_framework import generics, serializers, status 
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Lwin, User
from .serializers import *

import pandas as pd 

class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


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


# --------------------------- AUTH API ROUTES --------------------------- 
def is_authenticated_view(request):
    if request.user.is_authenticated:
        user = request.user
        return JsonResponse({"is_authenticated": True})
    else:
        return JsonResponse({"is_authenticated": False})

@login_required
def user_profile(request):
    if request.user.is_authenticated:
        user = request.user
        user_id = user.id
        username = user.username
        first_name = user.first_name
        last_name = user.last_name
        email = user.email
        date_joined = user.date_joined
        photo = user.photo #-------TO DO why not serializable?----------#

        user_profile = [user_id, username, first_name, last_name, email, date_joined]

        return JsonResponse({"user_profile": user_profile})
    else:
        return JsonResponse({"error": "access forbidden"})    


@csrf_exempt
def sign_in(request):
    if request.method == "POST":
        # Attempt to sign user in
        data = json.loads(request.body)
        
        username = data["username"]
        password = data["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication is sucessfull
        if user is not None:
            login(request, user)

            return JsonResponse({"success": "User signed in", "user_id": user.id, "username": user.username})
        else:
            return JsonResponse({"message": "Invalid username and/or password."})
        
    else:
        return JsonResponse({"error": "Invalid request method"})


def sign_out(request):
    logout(request)
    return JsonResponse({"success": "User logged out"})


@csrf_exempt
def sign_up(request):
    if request.method == "POST":
        data = json.loads(request.body)

        username = data["username"]
        # Ensure username is provided
        if len(username) < 2:
            return JsonResponse({"message": "Username must have at least 2 characters."})

        email = data["email"]
        if "@" not in email or "." not in email or len(email) < 7:
            return JsonResponse({"message": "Not valid email format."})

        password = data["password"]        
        confirmation = data["confirmation"]
        # Ensure password matches confirmation
        if password != confirmation:
            return JsonResponse({"message": "Passwords must match."})
        # Ensure password has at least 8 characters
        if len(password) < 6:
            return JsonResponse({"message": "Password must have at least 8 characters."})
        
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