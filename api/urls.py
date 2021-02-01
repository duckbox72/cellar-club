from django.urls import path
from .views import CreateLwinView, GetLwin, CreateSampleView, SampleView
from . import views


urlpatterns = [
    path('', SampleView.as_view()),
    path('create', CreateLwinView.as_view()),   
    path('search', GetLwin.as_view()), 

    # AUTH Routes
    path('is_authenticated', views.is_authenticated_view, name="is_authenticated"),
    path('login', views.login_view, name="login"),
    path('logout', views.logout_view, name="logout"),
    path('register', views.register, name="register"),

]