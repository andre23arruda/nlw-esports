from django.urls import path, include
from rest_framework import routers
from .api.viewsets import (
    AdsViewSet,
    GamesViewSet,
)

app_name = 'esports'

# router
router = routers.DefaultRouter()
router.register('ads', AdsViewSet, basename='Ads')
router.register('games', GamesViewSet, basename='Games')

urlpatterns = [
    path('api/esports/', include(router.urls)),
]
