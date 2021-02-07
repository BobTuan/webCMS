from django.contrib import admin
from myztree.models import workgroup, workgroup_user

class AreaAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'parent')
admin.site.register(workgroup, AreaAdmin),


class perAdmin(admin.ModelAdmin):
    list_display = ('id', 'userid', 'wkgroupid')
admin.site.register(workgroup_user,perAdmin),