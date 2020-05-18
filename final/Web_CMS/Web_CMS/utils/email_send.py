from random import Random
from users.models import EmailVerifyRecord
from django.core.mail import send_mail
from Web_CMS.settings import EMAIL_FROM


def random_str(randomlength=8):
    str = ''
    chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789'
    length = len(chars) - 1
    random = Random()
    for i in range(randomlength):
        str += chars[random.randint(0, length)]
    return str


def send_register_email(email):
    email_record = EmailVerifyRecord()
    code = random_str(16)
    email_record.code = code
    email_record.email = email
    email_record.save()
    email_title = 'Web_CMS网注册激活链接'
    email_body = ' 请 单 击 下 面 的 链 接 激 活 你 的 账 号 ：http://127.0.0.1:8000/active/{0}'.format(code)
    send_mail(email_title, email_body, EMAIL_FROM, [email])