from django.urls import path
from .views import CreateLwinView, LwinView, CreateSampleView, SampleView 

urlpatterns = [
    path('', LwinView.as_view()),
    path('create', CreateLwinView.as_view()),    
]
