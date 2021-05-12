from django.urls import path
from django.views.generic.base import View
#from .views import CreateLwinView, UserView
from . import views


urlpatterns = [
    # path('', UserView.as_view()),
    # IMPORT LWIN datadabase ROUTE
    path('lwin_import', views.lwin_import, name="lwin_import"),

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
    path('toggle_bottle_favorite', views.toggle_bottle_favorite, name="toggle_bottle_favorite"),

    # LOCATION RELATED ROUTES
    path('cellar_options', views.cellar_options, name="cellar_options"),
    path('bin_options/<str:cellarname>', views.bin_options, name="bin_options"),

    # MEMORY RELATED ROUTES
    path('add_consumption', views.add_consumption, name="add_consumption"),
    path('add_review', views.add_review, name="add_review"),

    path('get_memories_list/<str:display_name>', views.get_memories_list, name="get_memories_list"),
    path('get_display_name/<str:display_name>', views.get_display_name, name="get_display_name"),
    path('search_memory/<str:display_name>', views.search_memory, name="search_memory"),
    path('delete_memory_unconsume_bottle/<str:memory_id>', views.delete_memory_unconsume_bottle, name="delete_memory_unconsume_bottle"),

    path('get_reviews_list/<str:display_name>', views.get_reviews_list, name="get_reviews_list"),
    path('get_review_display_name/<str:display_name>', views.get_review_display_name, name="get_review_display_name"),
    path('search_review/<str:display_name>', views.search_review, name="search_review"),
    path('get_review/<str:bottle_id>', views.get_review, name="get_review"),
]