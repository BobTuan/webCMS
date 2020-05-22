# 引入path
from django.urls import path
from django.contrib import admin
# 正在部署的应用的名称
from notes.views import getTree,getNoteContent,getNotesList
from notes.views import addNote,deleteNote,renameNote
app_name = 'notes'

urlpatterns = [
    # 目前还没有urls
    path(r'getTree/',getTree.as_view()),
    path(r'getNoteContent/', getNoteContent.as_view()),
    path(r'getNotesList/', getNotesList.as_view()),
    path(r'addNote',addNote.as_view()),
    path(r'deleteNote',deleteNote.as_view()),
    path(r'renameNote',renameNote.as_view()),
]