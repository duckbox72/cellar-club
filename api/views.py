import json
from re import L
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

'''
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
'''
'''
class GetLwin(APIView):
    lookup_url_kwarg = 'display_name'

    def get(self, request, format=None):
        display_name = request.GET.get(self.lookup_url_kwarg)

        try:
            result = Lwin.objects.get(display_name=display_name)
        except:
            return JsonResponse({"message": "Sorry, no results found."})
        
        return JsonResponse(result.serializer(),  safe=False, status=status.HTTP_200_OK)
'''
'''
class SearchLwin(APIView):
    #serializer_class = SearchLwinSerializer
    lookup_url_kwarg = 'display_name'

    def get(self, request, format=None):
        display_name = request.GET.get(self.lookup_url_kwarg)

        results = Lwin.objects.filter(display_name__contains=display_name)
        results = results[:10]

        #mini_serializer returns solely display_name data
        return JsonResponse([result.mini_serializer() for result in results], safe=False, status=status.HTTP_200_OK)
'''     


# --------------------------- LWIN DATABASE ROUTES --------------------------- 

def get_lwin(request, display_name):
    try:
        result = Lwin.objects.get(display_name=display_name)
    except:
        return JsonResponse({"message": "Sorry, no results found."})
    
    return JsonResponse(result.serializer(),  safe=False, status=status.HTTP_200_OK)


def search_lwin(request, display_name):
    results = Lwin.objects.filter(display_name__contains=display_name)
    results = results[:10]
    
    #mini_serializer returns solely display_name data
    return JsonResponse([result.mini_serializer() for result in results], safe=False, status=status.HTTP_200_OK)


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

        user_profile = {"user_id": user_id, "username": username, "first_name": first_name, "last_name": last_name, "email": email, "date_joined": date_joined}

        return JsonResponse(user_profile)
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