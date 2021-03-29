import os
from typing import Sized
from django.db.models.query_utils import RegisterLookupMixin
import requests
import json
from re import L
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.db.models.fields import BooleanField, NullBooleanField
from django.http import JsonResponse
from django.shortcuts import render
#from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt

# generics classes from a generic view, access to HTTP status codes
from rest_framework import generics, serializers, status
from rest_framework import response 
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Bottle, BottleSize, Lwin, User, Vintage
from .serializers import *

import pandas as pd 


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


# ------------------------- GWS EXTERNAL API LOOKUP --------------------------------------
@login_required
def get_gws_data(request, lwin):
    try:
        gws_api_key = os.environ.get("GWS_API_KEY")
        headers = {'Accept': 'application/json', 'Authorization': f'Token {gws_api_key}'}

        response = requests.get(f"https://api.globalwinescore.com/globalwinescores/latest?lwin={lwin}", headers=headers)

        results = response.json()['results']
        gws_data = []
        for result in results:
            gws_data.append({'vintage': result['vintage'], 'score': result['score']})

    except:
        return JsonResponse({'error': 'Bad request.'}, status=status.HTTP_200_OK)

    #return JsonResponse([result for result in results], safe=False, status=status.HTTP_200_OK)
    return JsonResponse(gws_data, safe=False, status=status.HTTP_200_OK)


# --------------------------- LWIN DATABASE ROUTES --------------------------- 
@login_required
def get_lwin(request, display_name):
    try:
        result = Lwin.objects.get(display_name=display_name)
    except:
        return JsonResponse({"message": "Sorry, no results found."})
    
    return JsonResponse(result.serializer(),  safe=False, status=status.HTTP_200_OK)


@login_required
def search_lwin(request, display_name):
    results = Lwin.objects.filter(display_name__contains=display_name)
    results = results[:15]
    
    #mini_serializer returns display_name data only
    return JsonResponse([result.mini_serializer() for result in results], safe=False, status=status.HTTP_200_OK)
    

# ------------------------- BOTTLE model RELATED ROUTES -------------------------

@login_required
def get_bottle_sizes(request):
    sizes = BottleSize.objects.all()
    return JsonResponse([size.serializer() for size in sizes], safe=False, status=status.HTTP_200_OK)


@csrf_exempt
@login_required
def add_bottle_to_collection(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST request required."}, safe=False, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    user = request.user
    data = json.loads(request.body)

    print(data)


    # Parse date_added
    if data['date_added'] == None:
        date_added = None
    else:
        date_added = data['date_added'][0:9]

    # Parse lwin
    if 'lwin' not in data:
        print("NO DATA NO DATA")
        lwin = '9999999'
    else:
        lwin = data['lwin']

    bottle = Bottle(
        user = user,
        cellar = data['cellar'],
        bin = data['bin'],
        score = data['score'],
        lwin = lwin,
        display_name = data['display_name'],
        producer_title = data['producer_title'],
        producer_name = data['producer_name'],
        country = data['country'],
        region = data['region'],
        colour = data['colour'],
        vintage = data['vintage'],
        size = data['size'],
        store = data['store'],
        cost = data['cost'],
        note = data['note'],
        lwin11 = data['lwin11'],
        date_added = date_added,  
    )

    print(data)
    print(bottle.vintage)
    bottle.save()

    return JsonResponse({"success": "posted successfully"}, safe=False, status=status.HTTP_200_OK)


@login_required
def get_bottle(request, bottle_id):
    try:
        result = Bottle.objects.get(id=bottle_id)
    except:
        return JsonResponse({"error": "Sorry, no results found."})
    
    return JsonResponse(result.serializer(),  safe=False, status=status.HTTP_200_OK)
    


@login_required
def get_bottle_list(request, bottle_name):
    print(f'parameter received {bottle_name}')
    
    if bottle_name == 'null':
        bottle_list = Bottle.objects.all().order_by('-created')
        for bottle in bottle_list:
            print(bottle.display_name)
    else:
        try:    
            bottle_list = Bottle.objects.filter(display_name=bottle_name)
            for bottle in bottle_list:
                print(bottle.display_name)
        except:
            return JsonResponse({"error": "Sorry, no results found."})
        

    return JsonResponse([bottle.serializer() for bottle in bottle_list], safe=False, status=status.HTTP_200_OK)


@login_required
def get_bottle_name(request, display_name):
    try:
        result = Bottle.objects.filter(display_name=display_name)
    except:
        return JsonResponse({"error": "Sorry, no results found."})
    
    # Return first occurence of display_name // mini_serializer returns display_name data only
    return JsonResponse(result[0].mini_serializer(),  safe=False, status=status.HTTP_200_OK)
    # TO DO issue - handle no result-     


@login_required
def search_bottle(request, display_name):
    results = Bottle.objects.filter(display_name__contains=display_name)
    
    # Lists only display_name (aka mini_serializer)
    all_results = []
    for result in results:
        all_results.append({'display_name': result.display_name})

    # Parse results to return only distinct items
    response = []
    for result in all_results:
        if result not in response:
            response.append(result)

    return JsonResponse(response, safe=False, status=status.HTTP_200_OK)