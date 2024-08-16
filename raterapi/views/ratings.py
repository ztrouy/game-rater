from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from rest_framework.decorators import action
from raterapi.models import Rating, Game


class RatingSerializer(serializers.ModelSerializer):
    isOwner = serializers.SerializerMethodField()
    
    def get_isOwner(self, obj):
        return self.context["request"].user == obj.user
    
    class Meta:
        model = Rating
        fields = ["id", "rating", "isOwner", "user", "game"]


class RatingUpdateSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Rating
        fields = ["id", "rating"]


class RatingViewSet(viewsets.ViewSet):

    def retrieve(self, request, pk=None):
        try:
            rating = Rating.objects.get(pk=pk)
            serializer = RatingSerializer(rating, context={"request": request})
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Rating.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def create(self, request):
        game_id = request.data.get("gameId")
        game = Game.objects.get(pk=game_id)

        rating = Rating.objects.create(
            user = request.auth.user,
            game = game,
            rating = request.data.get("rating"))

        serializer = RatingSerializer(rating, context={"request": request})
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=["put"], url_path="edit")
    def edit(self, request):
        try:
            game_id = request.data.get("gameId")
            game = Game.objects.get(pk=game_id)
            rating = Rating.objects.get(game=game, user = request.auth.user)
            self.check_object_permissions(request, rating)

            serializer = RatingUpdateSerializer(rating, data=request.data)
            if serializer.is_valid():
                rating.rating = serializer.validated_data["rating"]
                rating.save()

                serializer = RatingSerializer(rating, context={"request": request})
                return Response(None, status=status.HTTP_204_NO_CONTENT)

        except Rating.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)