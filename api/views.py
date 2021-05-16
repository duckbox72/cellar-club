import os
import re
from typing import Sized
from django.db.models.query_utils import RegisterLookupMixin
import requests
import json
from re import L, S
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

from .models import * 
from .serializers import *

import pandas as pd 


# --------------------------- AUTH API ROUTES --------------------------- 
def is_authenticated(request):
    # This returns is_authenticated + dark_mode STATUSES
    if request.user.is_authenticated:
        user = request.user
        print(f"DARK_MODE STATUS {user.dark_mode}")
        return JsonResponse({"is_authenticated": True, "dark_mode": user.dark_mode})
    else:
        return JsonResponse({"is_authenticated": False, "dark_mode": False})

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


# ------------------------- USER model OPTIONS RELATED ROUTES
@csrf_exempt
@login_required
def toggle_dark_mode(request):

    if request.method != 'POST':
        return JsonResponse({"error": "POST request required."}, safe=False, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    user = request.user
    data = json.loads(request.body)

    user.dark_mode = data['dark_mode']
    user.save()
    
    return JsonResponse({"success": "dark mode updated."})

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
        results = Lwin.objects.filter(display_name=display_name)
        result = results[0]
    except:
        return JsonResponse({"message": "Sorry, no results found."})
    
    return JsonResponse(result.serializer(),  safe=False, status=status.HTTP_200_OK)


@login_required
def search_lwin(request, display_name):
    results = Lwin.objects.filter(display_name__contains=display_name)
    #results = results[:50]
    
    #mini_serializer returns display_name data only
    return JsonResponse([result.mini_serializer() for result in results], safe=False, status=status.HTTP_200_OK)
    

# ------------------------- BOTTLE model RELATED ROUTES -------------------------
@csrf_exempt
@login_required
def add_bottle_to_collection(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST request required."}, safe=False, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    user = request.user
    data = json.loads(request.body)

    # Parse cellarname and check if exists
    if data ['cellarname'] != None:
        try:
            cellar = Cellar.objects.get(cellarname=data['cellarname'])
        except:
            cellar = Cellar(user=user, cellarname=data['cellarname'])
            cellar.save()
    else:
        cellar = None

    # Parse binname and check if exists
    if data['binname'] != None and cellar != None:
        try:
            bin = Bin.objects.get(cellar=cellar, binname=data['binname'])
        except:
            bin = Bin(user=user, cellar=cellar, binname=data['binname'])
            bin.save()
    else:
        bin = None

    
    # Parse date_added
    if data['date_added'] == None:
        date_added = None
    else:
        date_added = data['date_added'][0:10]

    # Parse lwin
    if 'lwin' not in data:
        lwin = '9999999'
    else:
        lwin = data['lwin']

    bottle = Bottle(
        user = user,
        cellar = cellar,
        bin = bin,
        score = data['score'],
        lwin = lwin,
        display_name = data['display_name'],
        producer_title = data['producer_title'],
        producer_name = data['producer_name'],
        country = data['country'],
        region = data['region'],
        sub_region = data['sub_region'],
        colour = data['colour'],
        vintage = data['vintage'],
        size = data['size'],
        store = data['store'],
        cost = data['cost'],
        note = data['note'],
        lwin11 = data['lwin11'],
        date_added = date_added,  
    )

    bottle.save()

    return JsonResponse({"success": "posted successfully"}, safe=False, status=status.HTTP_200_OK)


@csrf_exempt
@login_required
def toggle_bottle_favorite(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST request required."}, safe=False, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    data = json.loads(request.body)

    bottle = Bottle.objects.get(id=data['id'])
    bottle.favorite = data['favorite']

    bottle.save()

    return JsonResponse({"success": "updated successfully"}, safe=False, status=status.HTTP_200_OK)


@login_required
def get_bottle(request, bottle_id):
    try:
        result = Bottle.objects.get(id=bottle_id)
    except:
        return JsonResponse({"error": "Sorry, no results found."})
    
    return JsonResponse(result.serializer(),  safe=False, status=status.HTTP_200_OK)
    

@login_required
def get_bottle_list(request, bottle_name):
    user = request.user

    if bottle_name == 'null':
        bottle_list = Bottle.objects.filter(user=user, consumed=False).order_by('-created')
    else:
        try:    
            bottle_list = Bottle.objects.filter(user=user, display_name=bottle_name, consumed=False)
        except:
            return JsonResponse({"error": "Sorry, no results found."})
        
    return JsonResponse([bottle.serializer() for bottle in bottle_list], safe=False, status=status.HTTP_200_OK)


@login_required
def get_bottle_name(request, display_name):
    user = request.user
    try:
        result = Bottle.objects.filter(user=user, display_name=display_name, consumed=False)
    except:
        return JsonResponse({"error": "Sorry, no results found."})
    
    # Return first occurence of display_name // mini_serializer returns display_name data only
    return JsonResponse(result[0].mini_serializer(),  safe=False, status=status.HTTP_200_OK)
    # TO DO issue - handle no result-     


@login_required
def search_bottle(request, display_name):
    user = request.user
    results = Bottle.objects.filter(user=user, display_name__contains=display_name, consumed=False)
    
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


@login_required
def store_options(request):
    user = request.user
    results = Bottle.objects.filter(user=user, store__isnull=False, consumed=False)
   
    # Lists only store (aka store_serializer)
    all_results = []
    for result in results:
        if result.store:
            all_results.append({'store': result.store})

    # Parse results to return only distinct items
    response = []
    for result in all_results:
        if result not in response:
            response.append(result)

    return JsonResponse(response, safe=False, status=status.HTTP_200_OK)
# ------------------------- LOCATION RELATED ROUTES models CELLAR and BIN-------------------------

@login_required
def cellar_options(request):
    user = request.user
    try:
        options = Cellar.objects.filter(user=user).order_by('cellarname')
    except:
        options = []

    return JsonResponse([cellar.serializer() for cellar in options], safe=False, status=status.HTTP_200_OK)


@login_required
def bin_options(request, cellarname):
    user = request.user
    try:
        cellar = Cellar.objects.get(cellarname=cellarname)
        options = Bin.objects.filter(user=user, cellar=cellar).order_by('binname')
    except:
        options= []
    

    return JsonResponse([bin.serializer() for bin in options], safe=False, status=status.HTTP_200_OK)


# ------------------------- MEMORY RELATED ROUTES models CONSUMPTION and REVIEW -------------------------

@csrf_exempt
@login_required
def add_consumption(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST request required."}, safe=False, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    user = request.user
    data = json.loads(request.body)

    date_consumed = data['date_consumed'][0:10]


    try:
        bottle = Bottle.objects.get(id=data['bottle_id'])
        bottle.consumed = True
        bottle.save()
    except:
        return JsonResponse({"error": "BAD request."}, safe=False, status=status.HTTP_400_BAD_REQUEST)
    

    consumption = Consumption(
        user = user,
        bottle = bottle,
        display_name = bottle.display_name,
        date_consumed = date_consumed,
        reason = data['reason'],
        private_note = data['private_note'],
        gathered = data['gathered'],
        permanently_deleted = data['permanently_deleted'],

        has_review=data['has_review'],
    )

    consumption.save()
    
    return JsonResponse({"success": "posted successfully"}, safe=False, status=status.HTTP_200_OK)


@login_required
def get_memories_list(request, display_name):
    user = request.user

    # Get consumption list
    if display_name == 'null':
        consumption_list = Consumption.objects.filter(user=user, permanently_deleted=False).order_by('-date_consumed')
    else:
        try:
            consumption_list = Consumption.objects.filter(user=user, display_name=display_name, permanently_deleted=False).order_by('-date_consumed')
        except: 
            return JsonResponse({"error": "Sorry, no results found."})
    
    return JsonResponse([consumption.serializer() for consumption in consumption_list], safe=False, status=status.HTTP_200_OK)


@login_required
def get_display_name(request, display_name):
    user = request.user
    try:
        result = Consumption.objects.filter(user=user, display_name=display_name, permanently_deleted=False)
    except:
        return JsonResponse({"error": "Sorry, no results found."})
    
    # Return first occurence of display_name // mini_serializer returns display_name data only
    return JsonResponse(result[0].mini_serializer(),  safe=False, status=status.HTTP_200_OK)
    # TO DO issue - handle no result-     


@login_required
def search_memory(request, display_name):
    user = request.user
    results = Consumption.objects.filter(user=user, display_name__contains=display_name, permanently_deleted=False)
    
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


@login_required
def delete_memory_unconsume_bottle(request, memory_id):

    memory = Consumption.objects.get(id=memory_id)
    
    bottle = memory.bottle
    bottle.consumed = False
    bottle.save()

    memory.delete()

    return JsonResponse({"success": "memory deleted and bottle returned to collection successfully"}, safe=False, status=status.HTTP_200_OK)


@csrf_exempt
@login_required
def add_review(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST request required."}, safe=False, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    user = request.user
    data = json.loads(request.body)

    date_tasted = data['date_tasted'][0:10]

    if data['bottle_id']:
        try: 
            bottle = Bottle.objects.get(id=data['bottle_id'])
            display_name = bottle.display_name
        except:
            bottle = None
            display_name = None
    else:
        bottle = None
        display_name = data['display_name']

    review = Review(
        user = user,
        date_tasted = date_tasted,
        display_name = display_name,

        bottle = bottle,
        
        lwin_lwin = data['lwin_lwin'],
        lwin_vintage = data['lwin_vintage'],
        lwin_colour = data['lwin_colour'],
        lwin_country = data['lwin_country'],
        lwin_region = data['lwin_region'],


        is_public = data['is_public'],
        like_status = data['like_status'],
        score = data['score'],
        tasting_note = data['tasting_note'],
    )

    review.save()

    return JsonResponse({"success": "posted successfully"}, safe=False, status=status.HTTP_200_OK)



@login_required
def get_reviews_list(request, display_name):
    user = request.user
    
    # Get reviews list
    if display_name == 'null':
        review_list = Review.objects.filter(user=user).order_by('-date_tasted')
    else:
        try:
            review_list = Review.objects.filter(user=user, display_name=display_name).order_by('-date_tasted')
        except: 
            return JsonResponse({"error": "Sorry, no results found."})

    return JsonResponse([review.serializer() for review in review_list], safe=False, status=status.HTTP_200_OK)


@login_required
def get_review_display_name(request, display_name):
    user = request.user
    try:
        result = Review.objects.filter(user=user, display_name=display_name)
    except:
        return JsonResponse({"error": "Sorry, no results found."})
    
    # Return first occurence of display_name // mini_serializer returns display_name data only
    return JsonResponse(result[0].mini_serializer(),  safe=False, status=status.HTTP_200_OK)
    # TO DO issue - handle no result-  


@login_required
def search_review(request, display_name):
    user = request.user
    results = Review.objects.filter(user=user, display_name__contains=display_name)
    
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


# Requested from MemoryCard.js handleSeeReviewClick()
@login_required
def get_review(request, bottle_id):
    bottle = Bottle.objects.get(id=bottle_id)
    review = Review.objects.get(bottle=bottle)

    return JsonResponse(review.serializer(), safe=False, status=status.HTTP_200_OK)


# Requested from MemoryCard.js handleSeeReviewClick()
@login_required
def delete_review(request, review_id):
    review = Review.objects.get(id=review_id)
    review.delete()

    return JsonResponse({"success": "deleted successfully"}, safe=False, status=status.HTTP_200_OK)


@csrf_exempt
@login_required
def toggle_review_privacy(request):
    if request.method != 'POST':
        return JsonResponse({"error": "POST request required."}, safe=False, status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
    data = json.loads(request.body)

    review = Review.objects.get(id=data['id'])
    review.is_public = data['is_public']

    review.save()

    return JsonResponse({"success": "updated successfully"}, safe=False, status=status.HTTP_200_OK)


# ------------------------- DASHBOARD (HOME) RELATED ROUTES models BOTTLE, CONSUMPTION and REVIEW -------------------------











# To be used as temp ROUTE when loading the complete LWIN database
'''
@login_required
def lwin_import(request):
    print('LWINimport CALLED')
    # Load data to DF and delete unecessary columns
    # pd.read_excel(<file>, <sheet name>)
    # df = pd.read_excel('api/LWINdatabase.xlsx', sheet_name='LWINdatabase')
    df = pd.read_csv('api/LWINdatabase.tsv', sep='\t', header=0)
    print('LWINimport FILE READ')
    df.drop(['STATUS', 'DATE_ADDED', 'DATE_UPDATED'], axis=1, inplace=True)
    
    
    # Convert Nan in empty string
    df = df.fillna('')

    # Convert every column into type string
    df = df.applymap(str)

    print(df.head())
    print(df.shape)
    
    for index, row in df.iterrows():
        
        lwin = row['LWIN']
        display_name = row['DISPLAY_NAME']
        producer_title = row['PRODUCER_TITLE']
        producer_name =  row['PRODUCER_NAME']
        wine = row['WINE']
        country = row['COUNTRY']
        region = row['REGION']
        sub_region = row['SUB_REGION']
        site = row['SITE']
        parcel = row['PARCEL']
        colour = row['COLOUR']
        type = row['TYPE']
        sub_type = row['SUB_TYPE']
        designation = row['DESIGNATION']
        classification = row['CLASSIFICATION']
        vintage_config = row['VINTAGE_CONFIG']
        first_vintage = row['FIRST_VINTAGE']
        final_vintage = row['FINAL_VINTAGE']
        reference = row['REFERENCE']

        new_lwin = Lwin(lwin=lwin, display_name=display_name, producer_title=producer_title, producer_name=producer_name, 
                        wine=wine, country=country, region=region, sub_region=sub_region, site=site, parcel=parcel,
                        colour=colour, type=type, sub_type=sub_type, designation=designation, classification=classification, 
                        vintage_config=vintage_config, first_vintage=first_vintage, final_vintage=final_vintage)

        new_lwin.save()
    
    print('ALL SAVED')

    return JsonResponse({"sucess": "Lwin catalog created"})
'''