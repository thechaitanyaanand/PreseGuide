from rest_framework import status, generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

from .models import UserProfile
from .serializers import (
    UserSerializer,
    GoogleAuthSerializer,
    UserUpdateSerializer,
    UserProfileSerializer
)

User = get_user_model()


@api_view(['POST'])
@permission_classes([AllowAny])
def google_auth(request):
    """
    Authenticate user with Google OAuth token.
    
    Request body:
        {
            "token": "google-id-token-from-frontend"
        }
    
    Response:
        {
            "user": {...},
            "access": "jwt-access-token",
            "refresh": "jwt-refresh-token"
        }
    """
    serializer = GoogleAuthSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        
        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
            'message': 'Authentication successful'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    """
    Logout user by blacklisting refresh token.
    
    Request body:
        {
            "refresh": "jwt-refresh-token"
        }
    """
    try:
        refresh_token = request.data.get('refresh')
        token = RefreshToken(refresh_token)
        token.blacklist()
        
        return Response({
            'message': 'Successfully logged out'
        }, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({
            'error': 'Invalid token or token already blacklisted'
        }, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(generics.RetrieveUpdateAPIView):
    """
    Get or update current authenticated user's information.
    
    GET /api/auth/me/ - Get current user
    PATCH /api/auth/me/ - Update current user
    """
    permission_classes = [IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return UserUpdateSerializer
        return UserSerializer
    
    def get_object(self):
        return self.request.user


class UserDetailView(generics.RetrieveAPIView):
    """
    Get public information about a specific user by ID.
    
    GET /api/users/{user_id}/
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_stats(request):
    """
    Get detailed statistics for current user.
    
    Response:
        {
            "level": 3,
            "level_name": "Building Confidence",
            "total_xp": 245,
            "xp_for_next_level": 55,
            "badges": ["welcome", "first_recording"],
            "presentations_count": 5,
            "recordings_count": 12,
            "improvement_rate": 23.5
        }
    """
    user = request.user
    profile = user.profile
    
    # Calculate improvement rate (placeholder for now)
    # In later phases, this will calculate based on recording iterations
    improvement_rate = 0.0
    
    return Response({
        'level': user.level,
        'level_name': user.level_name,
        'total_xp': user.total_xp,
        'xp_for_next_level': user.xp_for_next_level,
        'badges': user.badges,
        'presentations_count': profile.total_presentations,
        'recordings_count': profile.total_recordings,
        'improvement_rate': improvement_rate,
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def test_add_xp(request):
    """
    TEST ENDPOINT: Manually add XP to current user (for development/testing).
    Remove or restrict in production.
    
    Request body:
        {
            "amount": 50
        }
    """
    amount = request.data.get('amount', 0)
    
    if not isinstance(amount, int) or amount < 0:
        return Response({
            'error': 'Amount must be a positive integer'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    user = request.user
    new_level = user.add_xp(amount)
    
    return Response({
        'message': f'Added {amount} XP',
        'new_level': new_level,
        'total_xp': user.total_xp,
        'level_name': user.level_name,
        'xp_for_next_level': user.xp_for_next_level
    }, status=status.HTTP_200_OK)
