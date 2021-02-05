from django.urls import path
from .views import CreateLwinView, GetLwin, UserView
from . import views

urlpatterns = [
    path('', UserView.as_view()),
    path('create', CreateLwinView.as_view()),   
    path('search', GetLwin.as_view()),

    # AUTH API Routes
    path('is_authenticated', views.is_authenticated_view, name="is_authenticated"),
    path('signin', views.sign_in, name="signin"),
    path('signout', views.sign_out, name="signout"),
    path('signup', views.sign_up, name="signup"),
    path('user_profile', views.user_profile, name="user_profile"),

]