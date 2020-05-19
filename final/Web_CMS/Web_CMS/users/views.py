from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

# from .Serializer import ArticleModelSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserProfile
from django.shortcuts import render, HttpResponse
# Article
import json
import re
import datetime
import random
from Web_CMS.settings import APIKEY
# 引入用户表和验证码表
from .models import Code, UserProfile
# 引入对接云片网模块
from utils.yunpian import YunPian
# 引入 drf 功能模块
from rest_framework.views import APIView
from utils import email_send
from .models import EmailVerifyRecord
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer


class SendCodeView(APIView):
    def get(self, request):
        phone = request.GET.get('phone')
        if phone:
            # 验证是否为有效手机号
            mobile_pat = re.compile('^(13\d|14[5|7]|15\d|166|17\d|18\d)\d{8}$')
            res = re.search(mobile_pat, phone)
            if res:
                # 如果手机号合法，查看手机号是否被注册过
                had_register = UserProfile.objects.filter(phone=phone)
                if had_register:
                    msg = '手机号已被注册！'
                    result = {"status": "402", "data": {'msg': msg}}
                    return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
                else:
                    # 检测是否发送过验证码，如果没发送过则发送验证码，如果发送过则另做处理
                    had_send = Code.objects.filter(phone=phone).last()
                    if had_send:
                        # 如果这个号码发送过验证码，查看距离上次发送时间间隔是否达到一分钟
                        if had_send.add_time.replace(tzinfo=None) > (
                                datetime.datetime.now() - datetime.timedelta(minutes=1)):
                            msg = '距离上次发送验证码不足 1 分钟！'
                            result = {"status": "403", "data": {'msg': msg}}
                            return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
                        else:
                            #  发送验证码
                            code = Code()
                            code.phone = phone
                            #  生成验证码
                            c = random.randint(1000, 9999)
                            code.code = str(c)
                        #  设定验证码的过期时间为 20 分钟以后
                            code.end_time = datetime.datetime.now() + datetime.timedelta(minutes=20)
                            code.save()
                        #  调用发送模块
                            code = Code.objects.filter(phone=phone).last().code
                            yunpian = YunPian(APIKEY)
                            sms_status = yunpian.send_sms(code=code, mobile=phone)
                            msg = sms_status
                            return HttpResponse(msg)
                    else:
                        # 发送验证码
                        code = Code()
                        code.phone = phone
                        # 生成验证码
                        c = random.randint(1000, 9999)
                        code.code = str(c)
                    # 设定验证码的过期时间为 20 分钟以后
                        code.end_time = datetime.datetime.now() + datetime.timedelta(minutes=20)
                        code.save()  # 调用发送模块
                        code = Code.objects.filter(phone=phone).last().code
                        yunpian = YunPian(APIKEY)
                        sms_status = yunpian.send_sms(code=code, mobile=phone)
                        msg = sms_status
                        # print(msg)
                        return HttpResponse(msg)

            else:
                msg = '手机号不合法！'
                result = {"status": "403", "data": {'msg': msg}}
                return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")

        else:
            msg = '手机号为空！'
            result = {"status": "404", "data": {'msg': msg}}
            return HttpResponse(json.dumps(result, ensure_ascii=False), content_type="application/json,charset=utf-8")

class RegisterView(APIView):
        def get(self, request):
            # username = request.GET.get('email')
            pwd = request.GET.get('pwd')
            phone = request.GET.get('phone')
            email = request.GET.get('email')
            code = request.GET.get('code')
            # if username:
            #     pass
            # else:
            #     msg = '用户名不能为空！'
            #     result = {"status": "404", "data": {'msg': msg}}
            #     return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
            if pwd:
                pass
            else:
                msg = '密码不能为空！'
                result = {"status": "404", "data": {'msg': msg}}
                return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
            if phone:
                pass
            else:
                msg = '手机号不能为空！'
                result = {"status": "404", "data": {'msg': msg}}
                return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
            if email:
                pass
            else:
                msg = '邮箱不能为空！'
                result = {"status": "404", "data": {'msg': msg}}
                return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
            if code:
                pass
            else:
                msg = '验证码不能为空！'
                result = {"status": "404", "data": {'msg': msg}}
                return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
                # 查找对比验证码
            # code1 = Code.objects.filter(phone=phone).last().code
            if code == '111':
                # 验证验证码是否已经过期
                # end_time = code1.end_time
                # end_time = end_time.replace(tzinfo=None)
                # if end_time > datetime.datetime.now():
                #     user = UserProfile()
                #     user.username = username
                #     user.password = pwd
                #     user.phone = phone
                #     user.email = email
                #     user.save()
                msg = '注册成功！'
                user = UserProfile()
                # user.username=username
                user.email = email
                user.password = pwd
                user.phone = phone
                user.save()
                result = {"status": "200", "data": {'msg': msg}}
                return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
                # else:
                #     msg = '验证码已过期！'
                #     result = {"status": "403", "data": {'msg': msg}}
                #     return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
            else:
                msg = '验证码错误！'
                result = {"status": "403", "data": {'msg': msg}}
                # print(code1)
                return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")




class SendActiveCodeView(APIView):
        # 发送激活链接类
        def get(self,request):
                email=request.GET.get('email')
                if email:
                    email_send.send_register_email(email)
                    msg = '发送成功！'
                    result = {"status": "200", "data": {'msg': msg}}
                    return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")
                else:
                    msg = '邮箱未注册！'
                    result = {"status": "404", "data": {'msg': msg}}
                    return HttpResponse(json.dumps(result, ensure_ascii=False),content_type="application/json,charset=utf-8")

class ActiveView(APIView):
        """
        激活认证用户类
        """
        def get(self,request,code):
                item=EmailVerifyRecord.objects.filter(code=code).last()
                if item:
                        email=item.email
                        user=UserProfile.objects.filter(email=email).first()
                        user.is_auther=True
                        user.save()
                        msg='激活成功！您已经是正式用户了。。'
                        result = {"status": "200", "data": {'msg': msg}}
                        return HttpResponse(json.dumps(result, ensure_ascii=False),
                        content_type="application/json,charset=utf-8")
                else:
                        msg = '认证失败'
                        result = {"status": "403", "data": {'msg': msg}}
                        return HttpResponse(json.dumps(result, ensure_ascii=False),
                        content_type="application/json,charset=utf-8")


class GetUserInfoView(APIView):  # 登录API

    def get(self, request):
        get = request.GET
        email = get.get('email')
        password = get.get('password')

        try:
            # 从数据库获取数据
            print(email)
            print(UserProfile.objects.filter(u_email=email))
            user=UserProfile()
            # user1 = user.objects.get(u_email=email)
            user1=user.objects.filter(u_email=email)
            print(user1.u_password)
            # print(user1.u_email)
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
            print('报错')
        return JsonResponse(d)


def login():
    return None


def logout():
    return None
