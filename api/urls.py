from django.urls import path
from .views import CreateSampleView, SampleView 

urlpatterns = [
    path('', SampleView.as_view()),
    path('create', CreateSampleView.as_view()),
]
