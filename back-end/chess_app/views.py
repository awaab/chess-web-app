from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect



# Source: https://github.com/sibtc/simple-signup/tree/master/basic-example
# def signup(request):
#     if request.method == 'POST':
#         form = UserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             raw_password = form.cleaned_data.get('password1')
#             user = authenticate(username=username, password=raw_password)
#             login(request, user)
#             return redirect('home')
#     else:
#         form = UserCreationForm()
#     return render(request, 'core/signup.html', {'form': form})
# Create your views here.


from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
#from . import serializers
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse, HttpResponse
import json

'''
class UserListView(generics.ListAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
'''

class LoggedInView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        username = request.user.username
        content = {'user': username}
        return Response(content)

class SessionView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return JsonResponse({"SessionKey":request.session.session_key})


from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm

def sign_up_view(request):
    post_data = json.loads(request.body)
    form = UserCreationForm(post_data)
    if form.is_valid():
        form.save()
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=password)
        login(request, user)
        return JsonResponse({'message': 'logged in!','user':user.username}, status=200)
    return JsonResponse({'message': 'Username or password invalid/ already used'}, status=400)

def logout_view(request):
    username = request.user.username
    content = {'logged_out_user': username}
    logout(request)
    return JsonResponse(content)

def login_view(request):
    #if request.method == 'POST':
    #    print("YESS")
    post_data = json.loads(request.body)
    username = post_data['username']
    password = post_data['password']
    print("credintials",username,password)
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        # Redirect to a success page.
        return JsonResponse({'message': 'logged in!','user':user.username}, status=200)
    else:
        # Return an 'invalid login' error message.
        return JsonResponse({'message': 'Eror'}, status=401)

from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.utils import timezone



def get_all_logged_in_users():
    # Query all non-expired sessions
    # use timezone.now() instead of datetime.now() in latest versions of Django
    sessions = Session.objects.filter(expire_date__gte=timezone.now())
    uid_list = []

    # Build a list of user ids from that query
    for session in sessions:
        data = session.get_decoded()
        uid_list.append(data.get('_auth_user_id', None))

    # Query all logged in users based on id list
    return User.objects.filter(id__in=uid_list)