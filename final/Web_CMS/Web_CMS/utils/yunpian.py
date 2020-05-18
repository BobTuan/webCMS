import requests


class YunPian(object):
    def __init__(self, api_key):
        self.api_key = api_key
        self.single_send_url = 'HTTPS://sms.yunpian.com/v2/sms/single_send.json'

    def send_sms(self, code, mobile):
        parmas = {
            'apikey': self.api_key,
            'mobile': mobile,
            'text': '	【技术分享类】您的验证码是{code}。如非本人操作，请忽略本短信'.format
            (code=code) # {code}
        }
        # text 必须要跟云片后台的模板内容保持一致，不然发送不出去！
        r = requests.post(self.single_send_url, data=parmas)
        print(r)


if __name__ == '__main__':
    yun_pian = YunPian('***************（你的 apikey）')
    yun_pian.send_sms('***（验证码）', '*******（手机号）')

