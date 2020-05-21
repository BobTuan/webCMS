# 引入path
from django.urls import path
from django.contrib import admin
# 正在部署的应用的名称
from notes.views import getTree,getNoteContent,getNotesList
app_name = 'notes'

urlpatterns = [
    # 目前还没有urls
    path(r'getTree/',getTree.as_view()),
    path(r'getNoteContent/', getNoteContent.as_view()),
    path(r'getNotesList/', getNotesList.as_view()),
]