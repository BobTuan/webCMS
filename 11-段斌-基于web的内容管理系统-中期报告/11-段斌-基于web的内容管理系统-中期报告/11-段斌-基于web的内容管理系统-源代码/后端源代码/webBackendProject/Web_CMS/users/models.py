from datetime import datetime

from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

class UserProfile1(models.Model):
# class UserProfile(AbstractUser):

    u_username = models.CharField(max_length=32, verbose_name='用户名', unique=True)
    u_password = models.CharField(max_length=256, verbose_name='用户密码')
    u_email = models.CharField(max_length=64, verbose_name='用户邮箱', unique=True)
    u_icon = models.ImageField(upload_to='Usericons/%Y/%m/%d/', verbose_name='用户头像', blank=True, null=True)
    is_active = models.BooleanField(default=False, verbose_name='是否激活')
    is_delete = models.BooleanField(default=False, verbose_name='是否注销')
    APIkey = models.CharField(max_length=30, verbose_name='APIkey', default='asdfghjklzxcv')
    u_score = models.IntegerField(default=100, verbose_name="点数")

    class Meta:
        db_table = 'CMS_user1'
        verbose_name = '用户'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.u_username


class Feed(models.Model):
    F_name = models.CharField(max_length=32, verbose_name='订阅源名称', unique=True)
    F_Subscriber = models.ForeignKey(UserProfile1, on_delete=models.CASCADE)
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
    add_time = models.DateTimeField(default=datetime.now, verbose_name='添加时间')
    a_adder = models.ForeignKey(UserProfile1, on_delete=models.CASCADE)  # 添加该文章的人，即订阅的用户
    a_feed = models.ForeignKey(Feed, on_delete=models.CASCADE)  # 该文章来自于哪个订阅源
    a_status = models.IntegerField(default=1, verbose_name='文章状态')

    class Meta:
        verbose_name = '文章信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.a_title


class Category(models.Model):
    name = models.CharField(max_length=32, verbose_name='分类')

    def __str__(self):
        return self.name


class Tag(models.Model):
    name = models.CharField(max_length=32, verbose_name='标签')

    def __str__(self):
        return self.name


class Note(models.Model):
    N_owner = models.ForeignKey(UserProfile1, on_delete=models.CASCADE)  # 创建用户
    N_title = models.CharField(max_length=50, verbose_name='笔记标题', default='赶紧给这个笔记取个名字吧！')
    N_category = models.ForeignKey(Category, on_delete=models.CASCADE, primary_key=False, verbose_name='笔记分类')
    N_tags = models.ManyToManyField(Tag, blank=True, null=True, verbose_name='笔记标签')
    N_content = models.TextField(verbose_name='笔记内容')
    N_brief = models.CharField(max_length=100, verbose_name='笔记摘要', blank=True, null=True)
    N_idea = models.CharField(max_length=200, verbose_name='笔记想法', blank=True, null=True)
    N_pic = models.ImageField(upload_to='pictures/%Y/%m/%d/', verbose_name='笔记插图')
    N_istop = models.IntegerField(null=True, blank=True, verbose_name='置顶级别')  # 数字越高排名越靠上
    N_create_time = models.DateTimeField(default=datetime.now, verbose_name='创建时间')
    N_update_time = models.DateTimeField(default=datetime.now, verbose_name='更新时间')
    N_status = models.IntegerField(default=1, verbose_name='笔记状态')
    reference = models.ManyToManyField(Article, blank=True, null=True, verbose_name='相关文章')

    class Meta:
        verbose_name = '笔记信息'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.N_title
