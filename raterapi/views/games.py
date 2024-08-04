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
        fields = [
            "id", "title", "designer", "description", "yearReleased", "numberOfPlayers", 
            "estimatedTimeToPlay", "ageRecommendation", "isOwner", "categories"
        ]


class GameViewSet(viewsets.ViewSet):

    def list(self, request):
        games = Game.objects.all()
        serializer = GameSerializer(games, many=True, context={"request": request})
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        try:
            game = Game.objects.get(pk=pk)
            serializer = GameSerializer(game, context={"request": request})
            return Response(serializer.data)

        except Game.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        game =  Game.objects.create(
            user = request.user,
            title = request.data.get("title"),
            description = request.data.get("description"),
            designer = request.data.get("designer"),
            year_released = request.data.get("yearReleased"),
            number_of_players = request.data.get("numberOfPlayers"),
            estimated_time_to_play = request.data.get("estimatedTimeToPlay"),
            age_recommendation = request.data.get("ageRecommendation"))

        category_ids = request.data.get("categories", [])
        game.categories.set(category_ids)

        serializer = GameSerializer(game, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)
