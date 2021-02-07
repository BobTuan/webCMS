import json

from django.http import JsonResponse
from django.shortcuts import render

# Create your views here.
from myztree.models import workgroup


def ztree(request):
    nodes = workgroup.objects.all()
    return render(request, 'ztree.html',{'nodes':nodes})

def json_test2(request):
    book = workgroup.objects.all().values()
    print(book)
    data = list(book)
    print(data)
    data = json.dumps(data)
    print(data)
    return JsonResponse(data,safe=False)