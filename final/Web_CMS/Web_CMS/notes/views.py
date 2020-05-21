from django.shortcuts import render
from rest_framework.views import APIView
from notes.models import Note
# Create your views here.
from django.http import HttpResponse,JsonResponse
import json

class getTree(APIView):
	def get(self, request):
		user = request.GET.get('user')
		mList = Note.objects.all()
		_data = [
			{
				'id': x.id,
				'name': x.N_title,
				'pId': x.N_parent_id.id if x.N_parent_id else 0, 'open': 1
			} for x in mList
		]
		result = {"status": "200", "data": {'data':_data}}
		return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")
class getNotesList(APIView):
	def get(self,request):
		userID = request.GET.get('userID')
		# noteIDs=request.GET.get("noteIDs")
		noteIDs=request.GET.getlist("noteIDs")
		ids = list(map(int, noteIDs))
		if(ids[0]==0):
			mList = Note.objects.filter(N_owner_id=userID)
			_data = [
				{
					'id': x.id,
					'title': x.N_title,
					'createTime': x.N_create_time,
				} for x in mList
			]
			result = {"status": "200", "data": {'data': _data}}
		else:
			mList = Note.objects.filter(N_owner_id=userID,id__in=ids)
			_data = [
				{
					'id': x.id,
					'title':x.N_title,
					'createTime': x.N_create_time,
				} for x in mList
			]
			result = {"status": "200", "data": {'data': _data}}
		return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")
class getNoteContent(APIView):
	def get(self,request):
		userID=request.GET.get('userID')
		noteID=request.GET.get('noteID')
		mList = Note.objects.filter(N_owner_id=userID,id=noteID)
		_data = [
			{
				'id': x.id,
				'title': x.N_title,
				'content': x.N_content
			} for x in mList
		]
		result = {"status": "200", "data": {'data': _data}}
		return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")
class addNote(APIView):
	def post(self,request):
		return 1
class renameNote(APIView):
	def post(self,request):
		userID=request.POST.get('userID')
		noteID=request.POST.get('noteID')
		newTitle=request.POST.get('newTitle')
		print(noteID)
		print(newTitle)
		a = Note.objects.get(id=noteID)  # 查询一条你要更新的数据
		a.N_title = newTitle  # 赋值给你要更新的字段
		a.save()
		result = {"status": "200", "data": {'data': '0'}}
		return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")
class deleteNote(APIView):
	def post(self,request):
		return 1