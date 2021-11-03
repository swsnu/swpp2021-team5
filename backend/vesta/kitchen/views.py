from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
import json
from django.contrib.auth import authenticate, login, logout

# Create your views here.
def user(request):
    ## DO SOMETHING
    return