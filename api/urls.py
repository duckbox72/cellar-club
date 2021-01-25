from django.urls import path
from .views import CreateLwinView, GetLwin, CreateSampleView, SampleView 

urlpatterns = [
    path('', SampleView.as_view()),
    path('create', CreateLwinView.as_view()),   
    path('search', GetLwin.as_view()), 
]
