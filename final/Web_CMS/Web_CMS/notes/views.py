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
		curID=request.GET.get("curID")
		print(userID)
		print(curID)
		if(curID=="0"):
			mList = Note.objects.filter(N_owner_id=userID)
			_data = [
				{
					'id': x.id,
					'title':x.N_title,
					'createTime': x.N_create_time,
				} for x in mList
			]
			result = {"status": "200", "data": {'data': _data}}
		else:
			result = {"status": "200", "data": {'data': "0"}}
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
class createNode(APIView):
	def post(self,request):
		data = json.loads(request.body.decode('utf-8'))

		postdata = {
			"name": data['name'],
			"parent": Category.objects.get(id=data['parent'])
		}

		try:
			Category.objects.create(**postdata)

			return JsonResponse({'state': 1, 'message': '创建成功!'})
		except Exception as e:
			return JsonResponse({'state': 0, 'message': 'Create Error: ' + str(e)})
class updateNode(APIView):
	def post(self,request):
		return 1