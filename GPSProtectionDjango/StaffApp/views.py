from django.shortcuts import render, redirect
from .models import *
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.serializers import serialize

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def registrate(request):
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        name = request.POST.get('name')
        email = request.POST.get('email-register')
        password = request.POST.get('password-register')

        if User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email already exists'})

        name_parts = name.split(maxsplit=1)
        first_name, last_name = name_parts if len(name_parts) == 2 else (name, "")

        user = User(username=email, email=email, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()

        return JsonResponse({'success': True})

    return JsonResponse({'success': False, 'error': 'Invalid request method'})

def ajax_login(request):
    if request.method == "POST":
        username = request.POST.get('email')
        password = request.POST.get('password')
        
        # Debugging
        ''' print("Received email:", username)
        print("Received password:", password)
        '''
        user = authenticate(request, username=username, password=password)
        
        # Debugging
        '''
        print("User object after authenticate:", user)
        '''

        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid login credentials'})

    return JsonResponse({'success': False, 'error': 'Not a POST request'})

def profile(request):
    user = request.user

    #Testing
    for device in user.devices.all():
        print(device)
    for notification in user.notifications.all():
        print(notification)


    return render(request, 'profile.html', {'user':user, 'devices':user.devices.all(), 'notifications':user.notifications.all()})

def contacts(request):
    user = request.user
    flag = False
    if user.is_authenticated:
        flag = True
    return render(request, 'contacts.html', {'user':user, 'flag': flag})

def logout_view(request):
    logout(request)
    return redirect('/')