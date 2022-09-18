from django.db.models import Count
from django.utils.translation import gettext_lazy as _
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import AdSerializer, GameSerializer
from ..models import Ad, Game


class GamesViewSet(viewsets.ModelViewSet):
    '''API endpoint that allows Game to be viewed or edited.'''
    authentication_classes = []
    permission_classes = []
    http_method_names = ['get']
    queryset = Game.objects.annotate(count=Count('ads'))
    serializer_class = GameSerializer

    @action(detail=True, methods=['get'])
    def ads(self, request, *args, **kwargs):
        '''Return all ads of game'''
        instance = self.get_object()
        ads = instance.ads.all()
        serializer = AdSerializer(ads, many=True)
        return Response(serializer.data)

    # @method_decorator(cache_page(60))
    # def dispatch(self, *args, **kwargs):
    #     return super(GamesViewSet, self).dispatch(*args, **kwargs)


class AdsViewSet(viewsets.ModelViewSet):
    '''API endpoint that allows Ad to be viewed or edited.'''
    authentication_classes = []
    permission_classes = []
    http_method_names = ['get', 'post']
    queryset = Ad.objects.all()
    serializer_class = AdSerializer

    # def list(self, request):
    #     pass

    def retrieve(self, request, pk=None):
        pass

    # def create(self, request, *args, **kwargs):
    #     data = self.request.data
    #     print(data)
    #     return super().create(request, *args, **kwargs)

    @action(detail=True, methods=['get'])
    def discord(self, request, *args, **kwargs):
        '''Return all ads of game'''
        instance = self.get_object()
        return Response({'discord': instance.discord})
