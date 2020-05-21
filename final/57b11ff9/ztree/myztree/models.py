from django.contrib.auth.models import User
from django.db import models
# Create your models here.
class workgroup(models.Model):
    name =  models.CharField(max_length=100)
    parent =  models.ForeignKey('self', verbose_name='pId', null=True, blank=True, related_name='children',on_delete= models.CASCADE)

    class Meta:
        db_table = 'myztree_workgroup'
        verbose_name = verbose_name_plural = 'workgroup'

    def __str__(self):
        return self.name

class workgroup_user(models.Model):
    userid = models.OneToOneField(User, on_delete=models.CASCADE)
    wkgroupid = models.ForeignKey(workgroup,on_delete=models.CASCADE)

    class Meta:
        db_table = 'myztree_workgroup_user'
        verbose_name = verbose_name_plural = 'workgroup_user'