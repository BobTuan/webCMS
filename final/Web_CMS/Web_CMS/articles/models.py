from django.db import models
from users.models import  UserProfile
from datetime import datetime
# Create your models here.


class Feed(models.Model):
    F_name = models.CharField(max_length=32, verbose_name='订阅源名称', unique=True)
    F_Subscriber = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    F_URL = models.CharField(max_length=64, verbose_name='订阅源URL', unique=True)
    F_status = models.IntegerField(default=1, verbose_name='订阅源状态')
    F_icon = models.ImageField(upload_to='RSSicons/%Y/%m/%d/', verbose_name='订阅源图标', blank=True, null=True)
    Subscription_time = models.DateTimeField(default=datetime.now, verbose_name='订阅时间')

    class Meta:
        verbose_name = '订阅源信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.F_name


class Article(models.Model):
    # 文章信息
    a_title = models.CharField(max_length=50, verbose_name='文章标题', default='')
    a_time = models.DateTimeField(verbose_name='文章时间')
    a_source = models.CharField(max_length=50, verbose_name='文章来源', default='')
    a_author = models.CharField(max_length=30, verbose_name='文章作者', default='')
    a_content = models.TextField(verbose_name='文章内容')
    # a_brief = models.CharField(max_length=200, verbose_name='文章简介', blank=True, null=True)
    add_time = models.DateTimeField(default=datetime.now(), verbose_name='添加时间')
    a_adder = models.ForeignKey(UserProfile, on_delete=models.CASCADE)  # 添加该文章的人，即订阅的用户
    a_feed = models.ForeignKey(Feed, on_delete=models.CASCADE)  # 该文章来自于哪个订阅源
    a_status = models.IntegerField(default=1, verbose_name='文章状态')

    class Meta:
        verbose_name = '文章信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.a_title



