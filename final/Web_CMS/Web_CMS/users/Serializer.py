from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = "__all__"  # 序列化整个表的所有字段
        #  fields =('id','nickname','email','phone','cardid','pwd','bird','create_time','rid','name')
