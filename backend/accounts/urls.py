from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

app_name = 'accounts'

urlpatterns = [
    # Authentication
    path('auth/google/', views.google_auth, name='google-auth'),
    path('auth/logout/', views.logout, name='logout'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    
    # User management
    path('auth/me/', views.CurrentUserView.as_view(), name='current-user'),
    path('users/<uuid:id>/', views.UserDetailView.as_view(), name='user-detail'),
    path('auth/stats/', views.user_stats, name='user-stats'),
    
    # Development/Testing
    path('auth/test-xp/', views.test_add_xp, name='test-xp'),
]
