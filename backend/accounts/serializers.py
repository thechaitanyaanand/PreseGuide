from rest_framework import serializers
from google.oauth2 import id_token
from google.auth.transport import requests
from django.conf import settings
from .models import User, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    """Serializer for UserProfile model."""
    
    class Meta:
        model = UserProfile
        fields = [
            'notification_enabled',
            'audio_processing_preference',
            'profile_visibility',
            'total_presentations',
            'total_recordings',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['total_presentations', 'total_recordings', 'created_at', 'updated_at']


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model with nested profile data.
    Used for user registration, profile viewing, and updates.
    """
    profile = UserProfileSerializer(read_only=True)
    level_name = serializers.CharField(read_only=True)
    xp_for_next_level = serializers.IntegerField(read_only=True)
    
    class Meta:
        model = User
        fields = [
            'id',
            'email',
            'username',
            'first_name',
            'last_name',
            'profile_picture',
            'level',
            'level_name',
            'total_xp',
            'xp_for_next_level',
            'badges',
            'profile',
            'created_at',
            'updated_at'
        ]
        read_only_fields = [
            'id',
            'level',
            'level_name',
            'total_xp',
            'xp_for_next_level',
            'badges',
            'created_at',
            'updated_at'
        ]


class GoogleAuthSerializer(serializers.Serializer):
    """
    Serializer for Google OAuth authentication.
    Validates Google ID token and creates/retrieves user.
    """
    token = serializers.CharField(required=True, help_text="Google ID token from frontend")
    
    def validate_token(self, token):
        """
        Verify Google ID token and extract user information.
        Raises ValidationError if token is invalid.
        """
        try:
            # Verify the token with Google
            idinfo = id_token.verify_oauth2_token(
                token,
                requests.Request(),
                settings.GOOGLE_CLIENT_ID
            )
            
            # Verify token issuer
            if idinfo['iss'] not in ['accounts.google.com', 'https://accounts.google.com']:
                raise serializers.ValidationError('Invalid token issuer')
            
            # Token is valid, return user info
            return idinfo
            
        except ValueError as e:
            raise serializers.ValidationError(f'Invalid token: {str(e)}')
    
    def create(self, validated_data):
        """
        Create or retrieve user based on Google account info.
        This method is called after token validation.
        """
        idinfo = validated_data['token']
        
        # Extract user data from Google token
        google_id = idinfo['sub']
        email = idinfo['email']
        first_name = idinfo.get('given_name', '')
        last_name = idinfo.get('family_name', '')
        profile_picture = idinfo.get('picture', '')
        
        # Get or create user
        user, created = User.objects.get_or_create(
            google_id=google_id,
            defaults={
                'email': email,
                'username': email.split('@')[0],  # Use email prefix as username
                'first_name': first_name,
                'last_name': last_name,
                'profile_picture': profile_picture,
            }
        )
        
        # Update user info if it changed
        if not created:
            user.email = email
            user.first_name = first_name
            user.last_name = last_name
            user.profile_picture = profile_picture
            user.save()
        
        # Create profile if this is a new user
        if created:
            UserProfile.objects.create(user=user)
            # Award welcome badge and XP
            user.add_xp(10)  # Welcome bonus
            user.award_badge('welcome')
        
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile information."""
    
    profile = UserProfileSerializer(required=False)
    
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'profile']
    
    def update(self, instance, validated_data):
        """Update user and nested profile data."""
        profile_data = validated_data.pop('profile', None)
        
        # Update user fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        
        # Update profile if provided
        if profile_data and hasattr(instance, 'profile'):
            profile = instance.profile
            for attr, value in profile_data.items():
                setattr(profile, attr, value)
            profile.save()
        
        return instance
