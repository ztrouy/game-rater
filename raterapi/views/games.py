from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from raterapi.models import Game, Category
from .categories import CategorySerializer
from .reviews import ReviewSerializer


class GameSerializer(serializers.ModelSerializer):
    isOwner = serializers.SerializerMethodField()
    yearReleased = serializers.SerializerMethodField()
    numberOfPlayers = serializers.SerializerMethodField()
    estimatedTimeToPlay = serializers.SerializerMethodField()
    ageRecommendation = serializers.SerializerMethodField()
    categories = CategorySerializer(many=True)
    reviews = ReviewSerializer(many=True, read_only=False)
    averageRating = serializers.SerializerMethodField()
    hasRated = serializers.SerializerMethodField()

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
    
    def get_averageRating(self, obj):
        return obj.average_rating
    
    def get_hasRated(self, obj):
        user = self.context["request"].user
        return obj.ratings.filter(user=user).exists()

    class Meta:
        model = Game
        fields = [
            "id", "title", "designer", "description", "yearReleased", "numberOfPlayers", "estimatedTimeToPlay", 
            "ageRecommendation", "isOwner", "categories", "reviews", "averageRating", "hasRated"
        ]


class GameUpdateSerializer(serializers.ModelSerializer):
    isOwner = serializers.SerializerMethodField()
    categories = serializers.PrimaryKeyRelatedField(many=True, queryset=Category.objects.all())
    
    class Meta:
        model = Game
        fields = [
            "id", "title", "designer", "description", "year_released", "number_of_players", 
            "estimated_time_to_play", "age_recommendation", "isOwner", "categories"
        ]

    def to_internal_value(self, data):
        data = {
            "title": data.get("title"),
            "designer": data.get("designer"),
            "description": data.get("description"),
            "year_released": data.get("yearReleased"),
            "number_of_players": data.get("numberOfPlayers"),
            "estimated_time_to_play": data.get("estimatedTimeToPlay"),
            "age_recommendation": data.get("ageRecommendation"),
            "categories": data.get("categories")
        }
        return super().to_internal_value(data)


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

    def update(self, request, pk=None):
        try:
            game = Game.objects.get(pk=pk)

            self.check_object_permissions(request, game)

            serializer = GameUpdateSerializer(game, data=request.data)
            if serializer.is_valid():
                game.title = serializer.validated_data["title"]
                game.description = serializer.validated_data["description"]
                game.designer = serializer.validated_data["designer"]
                game.year_released = serializer.validated_data["year_released"]
                game.number_of_players = serializer.validated_data["number_of_players"]
                game.estimated_time_to_play = serializer.validated_data["estimated_time_to_play"]
                game.age_recommendation = serializer.validated_data["age_recommendation"]
                game.save()

                category_ids = request.data.get("categories", [])
                game.categories.set(category_ids)

                serializer = GameSerializer(game, context={"request": request})
                return Response(None, status=status.HTTP_204_NO_CONTENT)

            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        except Game.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
