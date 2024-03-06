from django.urls import path
from . import views

app_name = 'StaffApp'

urlpatterns = [
    path('', views.index, name='index'),

    path('registrate/', views.registrate, name='registrate'),
    path('login/', views.ajax_login, name='ajax_login'),
    path('profile/', views.profile, name="profile"),
    path('contacts/', views.contacts, name="contacts"),
    path('logout/', views.logout_view, name="logout"),
    
    path('phone_profile/', views.user_profile, name='user_profile'),
]