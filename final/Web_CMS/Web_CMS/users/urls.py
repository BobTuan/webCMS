# 引入path
from django.urls import path
from django.contrib import admin


# 正在部署的应用的名称
from rest_framework_jwt.views import obtain_jwt_token

from users import views
from users.views import GetUserInfoView
from users.views import SendCodeView, RegisterView,SendActiveCodeView,ActiveView
app_name = 'users'

urlpatterns = [
    # 目前还没有urls
    path(r'login/',GetUserInfoView.as_view(),name="article"),
    # path(r'register/', views.register.as_view()),
    path(r'logout/', views.logout),
    path(r'api-token-auth/', obtain_jwt_token),
    path('sendcode/', SendCodeView.as_view(), name='sendcode'),
    path('register/', RegisterView.as_view(), name='register'),
    path('sendactivecode/', SendActiveCodeView.as_view(), name='sendactivecode'),
    path('active/<str:code>', ActiveView.as_view(), name='active'),
]