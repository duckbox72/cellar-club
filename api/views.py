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
    if bottle_name == 'null':
        bottle_list = Bottle.objects.filter(consumed=False).order_by('-created')
    else:
        try:    
            bottle_list = Bottle.objects.filter(display_name=bottle_name, consumed=False)
        except:
            return JsonResponse({"error": "Sorry, no results found."})
        
    return JsonResponse([bottle.serializer() for bottle in bottle_list], safe=False, status=status.HTTP_200_OK)


@login_required
def get_bottle_name(request, display_name):
    try:
        result = Bottle.objects.filter(display_name=display_name, consumed=False)
    except:
        return JsonResponse({"error": "Sorry, no results found."})
    
    # Return first occurence of display_name // mini_serializer returns display_name data only
    return JsonResponse(result[0].mini_serializer(),  safe=False, status=status.HTTP_200_OK)
    # TO DO issue - handle no result-     


@login_required
def search_bottle(request, display_name):
    results = Bottle.objects.filter(display_name__contains=display_name, consumed=False)
    
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
        date_consumed = date_consumed,
        reason = data['reason'],
        private_note = data['private_note'],
        gathered = data['gathered'],
        permanently_deleted = data['permanently_deleted'],

        has_review=data['has_review'],
    )

    consumption.save()
    
    return JsonResponse({"success": "posted successfully"}, safe=False, status=status.HTTP_200_OK)



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
        except:
            bottle = None
    else:
        bottle = None

    review = Review(
        user = user,
        date_tasted = date_tasted,

        bottle = bottle,
        lwin_lwin = data['lwin_lwin'],
        lwin_vintage = data['lwin_vintage'],

        is_public = data['is_public'],
        like_status = data['like_status'],
        score = data['score'],
        tasting_note = data['tasting_note'],
    )


    review.save()

    return JsonResponse({"success": "posted successfully", "review_id": review.id}, safe=False, status=status.HTTP_200_OK)










# To be used as temp ROUTE when loading the complete LWIN database
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