from django.urls import path
from django.views.generic.base import View
#from .views import CreateLwinView, UserView
from . import views

urlpatterns = [
    # path('', UserView.as_view()),

    # AUTH API Routes
    path('is_authenticated', views.is_authenticated_view, name="is_authenticated"),
    path('signin', views.sign_in, name="signin"),
    path('signout', views.sign_out, name="signout"),
    path('signup', views.sign_up, name="signup"),
    path('user_profile', views.user_profile, name="user_profile"),

    # LWIN Database Routes
    # path('create', CreateLwinView.as_view()), 
    path('get_lwin/<str:display_name>', views.get_lwin, name="get_lwin"),  
    path('search_lwin/<str:display_name>', views.search_lwin, name="search_lwin"),

    # GWS external API ROUTE
    path('get_gws_data/<str:lwin>', views.get_gws_data, name="get_gws_data"),

    # BOTTLE related ROUTES
    path('get_bottle/<str:bottle_id>', views.get_bottle, name="get_bottle"), 
    path('get_bottle_list/<str:bottle_name>', views.get_bottle_list, name="get_bottle_list"),   
    path('get_bottle_name/<str:display_name>', views.get_bottle_name, name="get_bottle_name"),  
    path('search_bottle/<str:display_name>', views.search_bottle, name="search_bottle"),

    path('add_bottle_to_collection', views.add_bottle_to_collection, name="add_bottle_to_collection"),
    path('toggle_bottle_favorite/<str:bottle_id>', views.toggle_bottle_favorite, name="togglt_bottle_favorite"),

]