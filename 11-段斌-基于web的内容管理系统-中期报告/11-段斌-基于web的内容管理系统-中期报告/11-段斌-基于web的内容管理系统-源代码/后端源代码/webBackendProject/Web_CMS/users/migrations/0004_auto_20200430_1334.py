# Generated by Django 3.0.3 on 2020-04-30 13:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20200430_1322'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserProfile1',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('u_username', models.CharField(max_length=32, unique=True, verbose_name='用户名')),
                ('u_password', models.CharField(max_length=256, verbose_name='用户密码')),
                ('u_email', models.CharField(max_length=64, unique=True, verbose_name='用户邮箱')),
                ('u_icon', models.ImageField(upload_to='Usericons/%Y/%m/%d/', verbose_name='用户头像')),
                ('is_active', models.BooleanField(default=False, verbose_name='是否激活')),
                ('is_delete', models.BooleanField(default=False, verbose_name='是否注销')),
                ('APIkey', models.CharField(default='asdfghjklzxcv', max_length=30, verbose_name='APIkey')),
                ('u_score', models.IntegerField(default=100, verbose_name='点数')),
            ],
            options={
                'verbose_name': '用户',
                'verbose_name_plural': '用户',
                'db_table': 'CMS_user1',
            },
        ),
        migrations.AlterField(
            model_name='article',
            name='a_adder',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.UserProfile1'),
        ),
        migrations.AlterField(
            model_name='feed',
            name='F_Subscriber',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.UserProfile1'),
        ),
        migrations.AlterField(
            model_name='note',
            name='N_owner',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.UserProfile1'),
        ),
        migrations.DeleteModel(
            name='UserProfile',
        ),
    ]
