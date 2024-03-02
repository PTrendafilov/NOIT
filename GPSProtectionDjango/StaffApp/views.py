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

'''
def add_member(request):
    if request.method == "POST":
        name_in_latin = request.POST.get('name_in_latin')
        email = request.POST.get('email')
        position = request.POST.get('position')
        category = request.POST.get('category')
        research_interests = request.POST.get('research_interests')  # Depending on how you implement this
        profile_photo = request.FILES.get('profile_photo')
        short_cv = request.POST.get('short_cv')
        full_cv = request.POST.get('full_cv')
        scopus = request.POST.get('scopus')
        google_scholar = request.POST.get('google_scholar')
        web_of_science = request.POST.get('web_of_science')
        orcid = request.POST.get('orcid')
        additional_info = request.POST.get('additional_info')

        # Now create the Member instance and save
        member = Member(
            name=name_in_latin,
            email=email,
            position = position,
            category=category,
            research_interests=research_interests,
            profile_photo=profile_photo,
            short_cv=short_cv,
            full_cv=full_cv,
            scopus=scopus,
            google_scholar=google_scholar,
            web_of_science=web_of_science,
            orcid=orcid,
            additional_info=additional_info
        )
        member.save()

        return redirect('/staff/')  # Replace with your redirect view name

    return redirect('/staff/')  # Replace with your template path
'''
'''
@csrf_exempt
def delete_staff(request, staff_id):
    if request.method == "DELETE":
        try:
            staff_member = Member.objects.get(pk=staff_id)
            staff_member.delete()
            return JsonResponse({'success': True})
        except Member.DoesNotExist:
            return JsonResponse({'success': False})
    return JsonResponse({'success': False})
'''

'''
def staff_details(request, staff_name):
    staff = Member.objects.get(name=staff_name)
    staff.research_interests = staff.research_interests.split('/*/')
    staff.research_list = staff.written_researches.all()

    user = request.user
    
    if user:
        user.full_name = user.first_name +' '+ user.last_name
    
    members = Member.objects.all()

    members_name_list = []
    for member in members:
        members_name_list.append(member.name)

    return render(request, 'member-details.html', {'staff':staff, 'members':members_name_list})
'''

'''
@csrf_exempt
def edit_member(request, id):
    if request.method == "POST":
        # ... [rest of the code] ...
        member = Member.objects.get(pk=id)
        member.name = request.POST.get('name_in_latin')
        member.email = request.POST.get('email')
        member.category = request.POST.get('category')
        member.research_interests = request.POST.get('research_interests')  # Depending on how you implement this
        member.short_cv = request.POST.get('short_cv')
        member.full_cv = request.POST.get('full_cv')
        member.scopus = request.POST.get('scopus')
        member.google_scholar = request.POST.get('google_scholar')
        member.web_of_science = request.POST.get('web_of_science')
        member.orcid = request.POST.get('orcid')
        member.additional_info = request.POST.get('additional_info')


        profile_photo = request.FILES.get('profile_photo', None)
        if profile_photo:
            # If you want to overwrite the old image, you might want to delete it first
            if member.profile_photo:
                member.profile_photo.delete()
                
            member.profile_photo = profile_photo
        member.save()

        # Redirect to desired page after saving, e.g., the detail page for the edited member
        return redirect(f'/staff/{member}/')
        

    return render(request, 'error_template.html', context={...})
'''

@csrf_exempt
def registrate(request):
    if request.method == 'POST' and request.headers.get('X-Requested-With') == 'XMLHttpRequest':
        name = request.POST.get('name')
        email = request.POST.get('email-register')
        password = request.POST.get('password-register')
        category = request.POST.get('category')

        if User.objects.filter(email=email).exists():
            return JsonResponse({'success': False, 'error': 'Email already exists'})

        name_parts = name.split(maxsplit=1)
        first_name, last_name = name_parts if len(name_parts) == 2 else (name, "")

        if category == '1':
            user = Parent(username=email, email=email, first_name=first_name, last_name=last_name)
        elif category == '0':
            user = Child(username=email, email=email, first_name=first_name, last_name=last_name)
        else:
            return JsonResponse({'success': False, 'error': 'Invalid category'})

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
    flag = isinstance(user, Child)
    print(flag)
    return render(request, 'profile.html', {'user':user, 'flag':flag})

def contacts(request):
    user = request.user
    flag = False
    if user.is_authenticated:
        flag = True
    return render(request, 'contacts.html', {'user':user, 'flag': flag})

def logout_view(request):
    logout(request)
    return redirect('/')