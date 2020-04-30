# Generated by Django 3.0.3 on 2020-04-30 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_auto_20200430_1334'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feed',
            name='F_icon',
            field=models.ImageField(blank=True, null=True, upload_to='RSSicons/%Y/%m/%d/', verbose_name='订阅源图标'),
        ),
        migrations.AlterField(
            model_name='userprofile1',
            name='u_icon',
            field=models.ImageField(blank=True, null=True, upload_to='Usericons/%Y/%m/%d/', verbose_name='用户头像'),
        ),
    ]
