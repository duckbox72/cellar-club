from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('search', index),
    
    
    # AUTH Routes
    path('signin', index),
    path('signup', index),
    
]
