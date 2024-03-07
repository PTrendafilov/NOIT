from django.shortcuts import render, redirect
from .models import *
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.core.serializers import serialize
import json
from django.contrib.auth.decorators import login_required

def index(request):
    return render(request, 'index.html')

@csrf_exempt
def registrate(request):
    try:
        if request.method == 'POST':
            try:
                # Try to parse JSON data
                data = json.loads(request.body.decode('utf-8'))
            except json.JSONDecodeError:
                # Fallback to form data if JSON parsing fails
                data = {
                    'name': request.POST.get('name'),
                    'email-register': request.POST.get('email-register'),
                    'password-register': request.POST.get('password-register'),
                }

            name = data.get('name')
            email = data.get('email-register')
            password = data.get('password-register')

            if not (name and email and password):
                return JsonResponse({'success': False, 'error': 'Missing fields'})

            if User.objects.filter(email=email).exists():
                return JsonResponse({'success': False, 'error': 'Email already exists'})

            name_parts = name.split(maxsplit=1)
            first_name, last_name = name_parts if len(name_parts) == 2 else (name, "")

            user = User(username=email, email=email, first_name=first_name, last_name=last_name)
            user.set_password(password)
            user.save()

            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid request method'})
    except Exception as e:
        return JsonResponse({'success': False, 'error': 'Server Error: {}'.format(str(e))})
    
@csrf_exempt
def ajax_login(request):
    if request.method == "POST":
        try:
            # Try to parse JSON data
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            # Fallback to form data if JSON parsing fails
            data = {
                'email': request.POST.get('email'),
                'password': request.POST.get('password'),
            }

        username = data.get('email')
        password = data.get('password')

        if not username or not password:
            return JsonResponse({'success': False, 'error': 'Missing username or password'})

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'success': True})
        else:
            return JsonResponse({'success': False, 'error': 'Invalid login credentials'})

    return JsonResponse({'success': False, 'error': 'Not a POST request'})

@login_required
def user_profile(request):
    if request.method == "GET":
        user = request.user
        notifications = list(user.notifications.all().values())
        devices = list(user.devices.all().values())

        user_data = {
            'first_name': user.first_name,
            'email': user.email,
            'notifications': notifications,
            'devices': devices,
        }

        return JsonResponse(user_data)
    else:
        return JsonResponse({'error': 'Invalid request'}, status=400)
    
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