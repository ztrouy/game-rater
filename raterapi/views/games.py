from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from raterapi.models import Game
from .categories import CategorySerializer


class GameSerializer(serializers.ModelSerializer):
    isOwner = serializers.SerializerMethodField()
    yearReleased = serializers.SerializerMethodField()
    numberOfPlayers = serializers.SerializerMethodField()
    estimatedTimeToPlay = serializers.SerializerMethodField()
    ageRecommendation = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True)

    def get_isOwner(self, obj):
        return self.context["request"].user == obj.user
    
    def get_yearReleased(self, obj):
        return obj.year_released
    
    def get_numberOfPlayers(self, obj):
        return obj.number_of_players
    
    def get_estimatedTimeToPlay(self, obj):
        return obj.estimated_time_to_play
    
    def get_ageRecommendation(self, obj):
        return obj.age_recommendation
    
    class Meta:
        model = Game
        fields = ["id", "title", "designer", "description", "yearReleased", "numberOfPlayers", "estimatedTimeToPlay", "ageRecommendation", "isOwner", "categories"]


class GameViewSet(viewsets.ViewSet):

    def list(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True, context={"request": request})
        return Response(serializer.data)