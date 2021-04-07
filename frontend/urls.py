from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('search', index),
    path('collection', index),
    path('bottle', index),
    
    
    # AUTH Routes
    path('signin', index),
    path('signup', index),
    
]
