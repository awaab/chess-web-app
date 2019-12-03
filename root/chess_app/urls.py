from django.urls import path
from . import views
app_name = 'core'
urlpatterns = [
#path('signup/', views.signup, name='signup'),
#path('', views.UserListView.as_view()),
path('logged-in/', views.LoggedInView.as_view(), name='logged-in'),
path('session/', views.SessionView.as_view(), name='session'),
path('login/', views.login_view, name='login'),
path('logout/', views.logout_view, name='logout'),
path('signup/', views.sign_up_view, name='signup'),
path('endgame/', views.endgame_view, name='endgame'),
path('games_played/', views.games_played_view, name='games_played'),
]

