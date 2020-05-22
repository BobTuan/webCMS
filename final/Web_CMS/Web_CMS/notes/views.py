from django.shortcuts import render
from rest_framework.views import APIView
from notes.models import Note
# Create your views here.
from django.http import HttpResponse,JsonResponse
import json
from datetime import date, datetime
class ComplexEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.strftime('%Y-%m-%d %H:%M:%S')
        elif isinstance(obj, date):
            return obj.strftime('%Y-%m-%d')
        else:
            return json.JSONEncoder.default(self, obj)
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
		return HttpResponse(json.dumps(result, ensure_ascii=False,cls=ComplexEncoder), content_type="application/json,charset=utf-8")
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
					'createTime': str(x.N_create_time),
				} for x in mList
			]
			result = {"status": "200", "data": {'data': _data}}
		return HttpResponse(json.dumps(result, cls=ComplexEncoder), content_type="application/json,charset=utf-8")
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
		userID = request.POST.get('userID')
		node = request.POST.get("note")
		node=json.loads(node)
		title=node['name']
		pid=node['pid']
		Note.objects.create(  # 数据库插入语句
			N_title=title,  # 设定字段与传入值进行对应（将会什么内容将会保存在什么字段下。）。
			N_parent_id_id=pid,
			N_owner_id=1,
		)
		result = {"status": "200", "data": {'data': '0'}}
		return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")
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
		userID = request.POST.get('userID')
		noteID = request.POST.getlist('noteID')
		ids = list(map(int, noteID))
		Note.objects.filter(N_owner_id=userID,id__in=ids).delete()
		result = {"status": "200", "data": {'data': '0'}}
		return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")