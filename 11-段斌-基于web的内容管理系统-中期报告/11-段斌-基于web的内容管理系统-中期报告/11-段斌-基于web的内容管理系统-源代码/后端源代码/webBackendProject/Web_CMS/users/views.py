from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .Serializer import ArticleModelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile1, Article


class ArtcleAPIView(APIView):  # 使用apikey和文章名查询文章
    def get(self, request, format=None):
        APIkey = self.request.query_params.get("apikey", 0)
        developer = UserProfile1.objects.filter(APIkey=APIkey).first()
        if developer:
            title = self.request.query_params.get("title", 0)
            articles = Article.objects.filter(a_title=title)
            articles_serializer = ArticleModelSerializer(articles, many=True)
            return Response(articles_serializer.data)
        else:
            return Response("没有这篇文章")


class GetUserInfoView(APIView):  # 登录API

    def get(self, request):
        get = request.GET
        email = get.get('email')
        password = get.get('password')

        try:
            # 从数据库获取数据

            user1 = UserProfile1.objects.get(u_email=email)

            if user1.u_password == password:
                d = {
                    'status': 0,
                    'message': '登录成功'
                }
            else:
                d = {
                    'status': 2,
                    'message': '密码错误'
                }

        except Exception as e:
            d = {

                'status': 1,
                'message': '该邮箱未注册'
            }
            print('sss')
        return JsonResponse(d)


class register(APIView):
    def get(self, request):
        email = request.GET.get('email')
        username = request.GET.get('username')
        password = request.GET.get('password')
        user = UserProfile1()
        user.u_email = email
        user.u_username = username
        user.u_password = password
        user.save()
        d = {
            'message': '注册成功'
        }
        return JsonResponse(d)



def login():
    return None


def logout():
    return None
