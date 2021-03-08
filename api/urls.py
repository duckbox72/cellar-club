from django.urls import path
from django.views.generic.base import View
#from .views import CreateLwinView, UserView
from . import views

urlpatterns = [
    # path('', UserView.as_view()),
    
    # LWIN Database Routes
    # path('create', CreateLwinView.as_view()), 
    path('get_lwin/<str:display_name>', views.get_lwin, name="get_lwin"),  
    path('search_lwin/<str:display_name>', views.search_lwin, name="search_lwin"),

    # AUTH API Routes
    path('is_authenticated', views.is_authenticated_view, name="is_authenticated"),
    path('signin', views.sign_in, name="signin"),
    path('signout', views.sign_out, name="signout"),
    path('signup', views.sign_up, name="signup"),
    path('user_profile', views.user_profile, name="user_profile"),

]