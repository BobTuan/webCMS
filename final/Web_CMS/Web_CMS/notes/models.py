from django.db import models
from users.models import  UserProfile
from articles.models import Article
from datetime import datetime
# Create your models here.

from taggit.managers import TaggableManager




class Note(models.Model):
    N_owner = models.ForeignKey(UserProfile, on_delete=models.CASCADE)  # 创建用户
    N_title = models.CharField(max_length=50, verbose_name='笔记标题', default='赶紧给这个笔记取个名字吧！')
    # N_parent_id = models.ForeignKey('self', on_delete=models.SET_NULL, db_constraint=False,
    #                            null=True, blank=True, verbose_name='父节点')
    N_parent_id = models.CharField(max_length=50,
                                    null=True, blank=True, verbose_name='父节点')
    N_tags = models.CharField(max_length=500, blank=True, null=True, verbose_name='笔记标签')
    N_content = models.TextField(verbose_name='笔记内容')
    N_brief = models.CharField(max_length=100, verbose_name='笔记摘要', blank=True, null=True)
    N_idea = models.CharField(max_length=200, verbose_name='笔记想法', blank=True, null=True)
    N_pic = models.ImageField(upload_to='pictures/%Y/%m/%d/', null=True,verbose_name='笔记插图')
    N_istop = models.IntegerField(null=True, blank=True, verbose_name='置顶级别')  # 数字越高排名越靠上
    N_create_time = models.DateTimeField(default=datetime.now, null=True,verbose_name='创建时间')
    N_update_time = models.DateTimeField(default=datetime.now, null=True,verbose_name='更新时间')
    N_status = models.IntegerField(default=1, null=True,verbose_name='笔记状态')
    # reference = models.ManyToManyField(Article, blank=True, null=True, verbose_name='相关文章')

    class Meta:
        verbose_name = '笔记信息'
        verbose_name_plural = verbose_name
    def __str__(self):
        return self.N_title


