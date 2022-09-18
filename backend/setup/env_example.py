import os, json, socket


def get_ip_address():
    '''Return IP adress'''
    hostname = socket.gethostname()
    ip_address = socket.gethostbyname(hostname)
    return ip_address

def get_allowed_hosts():
    '''Create a list of aloowed hosts'''
    hosts = ['127.0.0.1', 'localhost', get_ip_address()]
    return hosts


os.environ['SECRET_KEY'] = 'your project secret key'
os.environ['DEBUG'] = 'true' # Empty string is False, else is True
os.environ['ALLOWED_HOSTS'] = json.dumps(get_allowed_hosts())

## DATABASE
os.environ['USE_SQLITE'] = 'true' # Empty string is False, else is True

os.environ['LANGUAGE_CODE'] = 'pt-br'
os.environ['TIME_ZONE'] = 'America/Sao_Paulo'
os.environ['AUTHOR'] = 'your name or email'
os.environ['AUTHOR_EMAIL'] = 'your_email@gmail.com'

# cors
os.environ['CORS_ALLOWED_ORIGINS'] = json.dumps([
    'http://localhost:3000',
    'http://localhost:5173',
])