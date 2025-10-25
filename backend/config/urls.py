from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # API endpoints
    path('api/', include('accounts.urls')),
    # path('api/', include('presentations.urls')),  # Coming in Phase 2
    # path('api/', include('collaboration.urls')),  # Coming in Phase 6
    # path('api/', include('gamification.urls')),   # Coming in Phase 5
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
