from rest_framework import serializers
from ..models import Ad, Game


class AdSerializer(serializers.ModelSerializer):
    '''Ad Serializer'''
    week_days_array = serializers.SerializerMethodField()
    def get_week_days_array(self, obj) -> list[str]:
        return [day for day in obj.week_days.split(',')]

    class Meta:
        model = Ad
        fields = '__all__'
        read_only_fields = ['week_days_array', ]


class GameSerializer(serializers.ModelSerializer):
    '''Game Serializer'''
    count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Game
        fields = '__all__'