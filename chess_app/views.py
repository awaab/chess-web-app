from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render, redirect
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from . import models
#from . import serializers
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse, HttpResponse
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.utils import timezone
from datetime import datetime
from django.db.models import Q
from django.template import Context, loader
from django.shortcuts import render

'''
class UserListView(generics.ListAPIView):
    queryset = models.CustomUser.objects.all()
    serializer_class = serializers.UserSerializer
'''


def index(request):
    return render(request, "index.html")

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

def endgame_view(request):
    post_data = json.loads(request.body)
    print(post_data)
    winner = post_data['winner']
    white_player = post_data['white_player']
    black_player =  post_data['black_player']
    duration = datetime.fromtimestamp(post_data['duration']).time()
    user = request.user
    if white_player == 'user':
        white_player = user
        black_player = User.objects.get(username=black_player)
    if black_player == 'user':
        black_player = user
        white_player = User.objects.get(username=white_player)
    game_instance = models.Game.objects.create(white_player=white_player,black_player=black_player,duration=duration,winner=winner)
    game_instance.save()
    return JsonResponse({'message': 'endgame_view'}, status=200)


def games_played_view(request):
    data={"games played":"games played"}
    games_list = []
    game_instances = models.Game.objects.filter(Q(white_player=request.user)|Q(black_player=request.user))
    won, lost, draw= 0, 0, 0
    for game in game_instances:
        if game.winner == 'D':
            draw +=1
        elif game.winner=='B':
            if game.black_player.username==request.user.username:
                won += 1
            else:
                lost +=1
        elif game.winner=='W':
            if game.white_player.username==request.user.username:
                won += 1
            else:
                lost +=1
        games_list.append(game.dictionary())  
    played = len(games_list)
    data = {'user':request.user.username,'played':played,'won':won,'lost':lost,'draw':draw,'games_list':games_list}
    return JsonResponse(data, status=200)

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