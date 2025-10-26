import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _


class User(AbstractUser):
    """
    Custom User model with UUID primary key and gamification fields.
    Extends Django's AbstractUser to maintain built-in auth functionality.
    """
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False,
        help_text="Unique identifier for the user"
    )
    
    email = models.EmailField(
        _('email address'),
        unique=True,
        help_text="User's email from Google OAuth"
    )
    
    # Google OAuth fields
    google_id = models.CharField(
        max_length=255,
        unique=True,
        null=True,
        blank=True,
        help_text="Google's unique user identifier"
    )
    
    profile_picture = models.URLField(
        max_length=500,
        null=True,
        blank=True,
        help_text="URL to user's Google profile picture"
    )
    
    # Gamification fields
    level = models.IntegerField(
        default=1,
        help_text="User's current level"
    )
    
    total_xp = models.IntegerField(
        default=0,
        help_text="Total experience points earned"
    )
    
    badges = models.JSONField(
        default=list,
        blank=True,
        help_text="Array of earned badge IDs"
    )
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    # Override username to make email the primary identifier
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Required for createsuperuser
    
    class Meta:
        db_table = 'users'
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']
    
    def __str__(self):
        return self.email
    
    def add_xp(self, amount):
        """
        Add XP and automatically level up if thresholds are met.
        Level thresholds: 1(0), 2(50), 3(150), 4(300), 5(500)
        """
        self.total_xp += amount
        
        # Level calculation based on XP thresholds
        if self.total_xp >= 500:
            self.level = 5
        elif self.total_xp >= 300:
            self.level = 4
        elif self.total_xp >= 150:
            self.level = 3
        elif self.total_xp >= 50:
            self.level = 2
        else:
            self.level = 1
        
        self.save()
        return self.level
    
    def award_badge(self, badge_name):
        """Add a badge to the user's collection if not already present."""
        if badge_name not in self.badges:
            self.badges.append(badge_name)
            self.save()
    
    @property
    def level_name(self):
        """Return human-readable level name."""
        level_names = {
            1: "First Words",
            2: "Finding Voice",
            3: "Building Confidence",
            4: "Commanding Presence",
            5: "Presentation Master"
        }
        return level_names.get(self.level, "Unknown")
    
    @property
    def xp_for_next_level(self):
        """Calculate XP needed for next level."""
        thresholds = {1: 50, 2: 150, 3: 300, 4: 500, 5: float('inf')}
        next_threshold = thresholds.get(self.level, float('inf'))
        return max(0, next_threshold - self.total_xp)


class UserProfile(models.Model):
    """
    Extended user profile with additional preferences and settings.
    One-to-one relationship with User model.
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile',
        primary_key=True
    )
    
    # Preferences
    notification_enabled = models.BooleanField(
        default=True,
        help_text="Enable email notifications"
    )
    
    audio_processing_preference = models.CharField(
        max_length=20,
        choices=[
            ('fast', 'Fast (lower quality)'),
            ('balanced', 'Balanced'),
            ('accurate', 'Accurate (slower)')
        ],
        default='balanced',
        help_text="Audio analysis quality preference"
    )
    
    # Privacy settings
    profile_visibility = models.CharField(
        max_length=20,
        choices=[
            ('public', 'Public'),
            ('private', 'Private'),
            ('friends', 'Friends Only')
        ],
        default='private'
    )
    
    # Statistics
    total_presentations = models.IntegerField(
        default=0,
        help_text="Total number of presentations created"
    )
    
    total_recordings = models.IntegerField(
        default=0,
        help_text="Total number of recordings analyzed"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'user_profiles'
    
    def __str__(self):
        return f"Profile of {self.user.email}"
