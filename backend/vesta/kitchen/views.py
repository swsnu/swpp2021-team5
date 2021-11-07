import json
import datetime
from django.http import HttpResponse, HttpResponseNotAllowed
from django.contrib.auth.models import User
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_http_methods

from .models import Profile, UserNutrition, Preference, Menu

# Create your views here.


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])


@require_http_methods(["POST"])
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = User.objects.create_user(username=username, password=password)

        # Model 'Profile' should be created simultaneously #
        profile = Profile(user=user)
        profile.save()

        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed(['POST'])


@require_http_methods(["POST"])
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['POST'])


def signout(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            logout(request)
            return HttpResponse(status=204)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET'])


def resign(request):
    if request.method == 'DELETE':
        print(request.user)
        if request.user.is_authenticated:
            user = User.objects.get(id=request.user.id)
            user.delete()
            logout(request)
            return HttpResponse(status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['DELETE'])


def profile(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            try:
                user = User.objects.get(id=request.user.id)
            except User.DoesNotExist:      # Profile.DoesNotExist?
                return HttpResponse(status=404)

            food_preference_list = []
            for item in Preference.objects.filter(user_id=request.user.id):
                food_preference_list.append(str(item.menu.name))

            response_dict = {
                'username': user.username,
                'age': user.profile.age,
                'sex': user.profile.sex,
                'height': user.profile.height,
                'weight': user.profile.weight,
                'preference': food_preference_list
            }
            return JsonResponse(response_dict, status=200, safe=False)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            try:
                user = User.objects.get(id=request.user.id)
            except User.DoesNotExist:           # may be equals to Profile.DoesNotExist
                return HttpResponse(status=404)

            # Should I add checking Forbidden(403) ??

            req_data = json.loads(request.body.decode())
            new_username = req_data['username']
            new_age = int(req_data['age'])
            new_sex = req_data['sex']
            new_height = int(req_data['height'])
            new_weight = int(req_data['weight'])
            new_food_preference_list = req_data['preference']

            user.username = new_username
            user.profile.age = new_age
            user.profile.sex = new_sex
            user.profile.height = new_height
            user.profile.weight = new_weight
            user.save()
            user.profile.save()

            # lines below should be refactored so that pk of row could be keep
            Preference.objects.filter(user_id=request.user.id).delete()
            for food in new_food_preference_list:
                new_menu = Menu.objects.get(name=food)
                new_preference_item = Preference(
                    user=request.user, menu=new_menu)
                new_preference_item.save()
            food_preference_list_response = []
            for item in Preference.objects.filter(user_id=request.user.id):
                food_preference_list_response.append(str(item.menu.name))

            response_dict = {
                'username': user.username,
                'age': user.profile.age,
                'sex': user.profile.sex,
                'height': user.profile.height,
                'weight': user.profile.weight,
                'preference': food_preference_list_response
            }
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])


def nutrition(request):
    if request.method == 'GET':
        if request.user.is_authenticated:
            req_data = json.loads(request.body.decode())
            # req_data['date'] comes in YYYY-MM-DD form, transform the string
            # into datetime object
            date_list = req_data['date'].split('-')
            today = datetime.date(int(date_list[0]), int(
                date_list[1]), int(date_list[2]))
            try:
                today_nutrition = UserNutrition.objects.get(
                    user_id=request.user.id, date=today)
            except UserNutrition.DoesNotExist:      # User.DoesNotExist?
                return HttpResponse(status=404)
            response_dict = {
                'user_id': today_nutrition.user_id,
                # is it okay?
                'date': today_nutrition.date.strftime('%Y-%m-%d'),
                'calories': today_nutrition.calories,
                'carbs': today_nutrition.carbs,
                'protein': today_nutrition.protein,
                'fat': today_nutrition.fat
            }
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            req_data = json.loads(request.body.decode())
            date_list = req_data['date'].split('-')
            today = datetime.date(int(date_list[0]), int(
                date_list[1]), int(date_list[2]))
            calories = int(req_data['calories'])
            carbs = int(req_data['carbs'])
            protein = int(req_data['protein'])
            fat = int(req_data['fat'])

            new_record = UserNutrition(
                user=request.user,
                date=today,
                calories=calories,
                carbs=carbs,
                protein=protein,
                fat=fat)
            new_record.save()

            response_dict = {
                'id': new_record.id,
                'user_id': new_record.user_id,
                'date': new_record.date.strftime('%Y-%m-%d'),  # is it okay?
                'calories': new_record.calories,
                'carbs': new_record.carbs,
                'protein': new_record.protein,
                'fat': new_record.fat,
            }
            return JsonResponse(response_dict, status=201)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            req_data = json.loads(request.body.decode())
            date_list = req_data['date'].split('-')
            today = datetime.date(int(date_list[0]), int(
                date_list[1]), int(date_list[2]))
            try:
                today_nutrition = UserNutrition.objects.get(
                    user_id=request.user.id, date=today)
            except UserNutrition.DoesNotExist:    # User.DoesNotExist?
                return HttpResponse(status=404)

            # should add checking Forbidden(403)
            new_calories = int(req_data['calories'])
            new_carbs = int(req_data['carbs'])
            new_protein = int(req_data['protein'])
            new_fat = int(req_data['fat'])

            today_nutrition.calories = new_calories
            today_nutrition.carbs = new_carbs
            today_nutrition.protein = new_protein
            today_nutrition.fat = new_fat
            today_nutrition.save()

            response_dict = {
                'id': today_nutrition.id,
                'user_id': today_nutrition.user_id,
                'date': today_nutrition.date.strftime('%Y-%m-%d'),
                'calories': today_nutrition.calories,
                'carbs': today_nutrition.carbs,
                'protein': today_nutrition.protein,
                'fat': today_nutrition.fat,
            }
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'PUT'])
