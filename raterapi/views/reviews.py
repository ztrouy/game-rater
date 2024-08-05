from rest_framework import viewsets, status, serializers
from rest_framework.response import Response
from raterapi.models import Review
from django.contrib.auth.models import User


class ReviewUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "first_name", "last_name"]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["firstName"] = representation.pop("first_name")
        representation["lastName"] = representation.pop("last_name")
        return representation


class ReviewSerializer(serializers.ModelSerializer):
    isOwner = serializers.SerializerMethodField()
    user = ReviewUserSerializer(many=False)

    def get_isOwner(self, obj):
        return self.context["request"].user == obj.user

    class Meta:
        model = Review
        fields = ["id", "content", "user", "isOwner"]
