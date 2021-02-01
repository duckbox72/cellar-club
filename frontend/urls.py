from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('profile', index),
    path('contact', index),
    path('collection', index),

    # AUTH Routes
    path('login', index),
]
