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

