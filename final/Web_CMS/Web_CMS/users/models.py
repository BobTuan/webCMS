from datetime import datetime
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

# Create your models here.

class UserProfile(AbstractUser):
    # is_active = models.BooleanField(default=False, verbose_name='是否激活')
    # is_delete = models.BooleanField(default=False, verbose_name='是否注销')
    # u_username = models.CharField(max_length=32, verbose_name='用户名', unique=True)
    # u_password = models.CharField(max_length=256, verbose_name='用户密码')
    username = None
    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    phone = models.CharField(max_length=256, verbose_name='电话号码',default="110")
    # u_email = models.CharField(max_length=100, null=True, blank=True, verbose_name=' 用户邮箱')
    u_icon = models.ImageField(upload_to='Usericons/%Y/%m/%d/', verbose_name='用户头像', blank=True, null=True)
    is_auther = models.BooleanField(default=False, verbose_name='是否认证')
    add_time = models.DateTimeField(default=datetime.now, verbose_name='添加时间 ')

    # APIkey = models.CharField(max_length=30, verbose_name='APIkey', default='asdfghjklzxcv')
    # u_score = models.IntegerField(default=100, verbose_name="点数")

    class Meta:
        db_table = 'CMS_user'
        verbose_name = '用户'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.email


class Key(models.Model):
    author = models.ForeignKey(UserProfile, verbose_name='开发者', on_delete=models.CASCADE)
    app_name = models.CharField(max_length=10, verbose_name='应用名称')
    key = models.CharField(max_length=32, verbose_name='应用 key 值')
    add_time = models.DateTimeField(default=datetime.now, verbose_name='添加时间')

    class Meta:
        verbose_name = 'key 表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.key


class Code(models.Model):
    phone = models.CharField(max_length=11, verbose_name='手机号')
    code = models.CharField(max_length=4, verbose_name='验证码')
    add_time = models.DateTimeField(default=datetime.now, verbose_name='添加时间')
    end_time = models.DateTimeField(default=datetime.now, verbose_name='过期时间')

    class Meta:
        verbose_name = '验证码表'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.phone



class EmailVerifyRecord(models.Model):
    code = models.CharField(max_length=20, verbose_name='激活码')
    email = models.EmailField(max_length=50, verbose_name='邮箱')
    send_time = models.DateTimeField(verbose_name=' 发 送 时 间',default=datetime.now)
    class Meta:
        verbose_name = '邮箱验证码'
        verbose_name_plural = verbose_name
    def __str__(self):
        return '{0}({1})'.format(self.code, self.email)





