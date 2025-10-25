from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, UserProfile


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """Custom admin interface for User model."""
    
    list_display = ['email', 'username', 'first_name', 'last_name', 'level', 'total_xp', 'is_staff', 'created_at']
    list_filter = ['level', 'is_staff', 'is_active', 'created_at']
    search_fields = ['email', 'username', 'first_name', 'last_name', 'google_id']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Authentication', {
            'fields': ('email', 'username', 'password', 'google_id')
        }),
        ('Personal Info', {
            'fields': ('first_name', 'last_name', 'profile_picture')
        }),
        ('Gamification', {
            'fields': ('level', 'total_xp', 'badges'),
            'classes': ('collapse',)
        }),
        ('Permissions', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
            'classes': ('collapse',)
        }),
        ('Important Dates', {
            'fields': ('last_login', 'date_joined', 'created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'last_login', 'date_joined']
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'username', 'password1', 'password2'),
        }),
    )


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """Admin interface for UserProfile model."""
    
    list_display = ['user', 'notification_enabled', 'profile_visibility', 'total_presentations', 'total_recordings']
    list_filter = ['notification_enabled', 'profile_visibility', 'audio_processing_preference']
    search_fields = ['user__email', 'user__username']
    
    fieldsets = (
        ('User', {
            'fields': ('user',)
        }),
        ('Preferences', {
            'fields': ('notification_enabled', 'audio_processing_preference', 'profile_visibility')
        }),
        ('Statistics', {
            'fields': ('total_presentations', 'total_recordings')
        }),
    )
    
    readonly_fields = ['total_presentations', 'total_recordings']
