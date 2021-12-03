import json
import datetime
import re
import random
from django.db.models.fields import NullBooleanField
from django.http import HttpResponse, HttpResponseNotAllowed
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt, ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_http_methods, require_GET

from django.contrib.auth.models import User
from .models import Profile, TodayMenu, UserNutrition, Preference, Menu, Record
# import logmeal as api
import os
from django.forms.models import model_to_dict

# Create your views here.

@require_http_methods(["POST"])
def signup(request):
    req_data = json.loads(request.body.decode())
    username = req_data['username']
    password = req_data['password']
    user = User.objects.create_user(username=username, password=password)

    # Model 'Profile' should be created simultaneously #
    new_profile = Profile(user=user, age=None, sex=None, height=None, weight=None)
    new_profile.save()

    return HttpResponse(status=201)

@require_http_methods(["POST"])
def signin(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            try:
                user = User.objects.get(id=user.id)
            except User.DoesNotExist:      # Profile.DoesNotExist?
                return HttpResponse(status=404)

            food_preference_list = []
            for item in Preference.objects.filter(user_id=user.id):
                food_preference_list.append(str(item.menu.name))
            user_profile = user.profile
            response_dict = {
                'userID': user.id,
                'username': user.username,
                'age': user_profile.age,
                'sex': user_profile.sex,
                'height': user_profile.height,
                'weight': user_profile.weight,
                'preference': food_preference_list,
                'targetCalories': user_profile.target_calories
            }
            return JsonResponse(response_dict, status=200, safe=False)
        else:
            return HttpResponse(status=401)

    else:
        return HttpResponse(status=401)

@require_http_methods(["GET"])
def signout(request):
    if request.user.is_authenticated:
        logout(request)
        return HttpResponse(status=204)
    else:
        return HttpResponse(status=401)

@require_http_methods(["DELETE"])
def resign(request):
    print(request.user)
    if request.user.is_authenticated:
        user = User.objects.get(id=request.user.id)
        user.delete()
        logout(request)
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=401)

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

            user_profile = user.profile
            response_dict = {
                'username': user.username,
                'age': user_profile.age,
                'sex': user_profile.sex,
                'height': user_profile.height,
                'weight': user_profile.weight,
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

            user_profile = user.profile
            req_data = json.loads(request.body.decode())
            user.username = req_data['username']
            user_profile.age = int(req_data['age'])
            user_profile.sex = req_data['sex']
            user_profile.height = int(req_data['height'])
            user_profile.weight = int(req_data['weight'])
            user.save()
            user_profile.save()

            # lines below should be refactored so that pk of row could be keep
            new_food_preference_list = req_data['preference']

            Preference.objects.filter(user_id=request.user.id).delete()
            for food in new_food_preference_list:
                new_preference_item = Preference(user=request.user, ingredient=food)
                new_preference_item.save()
            food_preference_list_response = []
            for item in Preference.objects.filter(user_id=request.user.id):
                food_preference_list_response.append(str(item.menu.name))

            response_dict = {
                'username': user.username,
                'age': user_profile.age,
                'sex': user_profile.sex,
                'height': user_profile.height,
                'weight': user_profile.weight,
                'preference': food_preference_list_response
            }
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'PUT'])

@require_http_methods(["GET"])
def nutrition_all(request):
    if not request.user.is_authenticated:
        return HttpResponse(status=401)
    else:
        nutrition_objects = UserNutrition.objects.filter(user=request.user).order_by('-date')
        response_list = []
        for row in nutrition_objects:
            response_list.append({
                'date': row.date.strftime('%Y-%m-%d'),
                'calories': row.calories,
                'carbs': row.carbs,
                'protein': row.protein,
                'fat': row.fat
            })
        return JsonResponse(response_list, status=200, safe=False)

def nutrition(request, date):
    if request.method == 'GET':
        if request.user.is_authenticated:
            # req_data['date'] comes in YYYY-MM-DD form, transform the string
            # into datetime object
            date_list = date.split('-')
            today = datetime.date(int(date_list[0]), int(
                date_list[1]), int(date_list[2]))
            try:
                today_nutrition = UserNutrition.objects.get(
                    user_id=request.user.id, date=today)
            except UserNutrition.DoesNotExist:      # User.DoesNotExist?
                return HttpResponse(status=404)
            response_dict = {
                #'date': today_nutrition.date.strftime('%Y-%m-%d'),
                'calories': today_nutrition.calories,
                'carbs': today_nutrition.carbs,
                'protein': today_nutrition.protein,
                'fat': today_nutrition.fat,
                'count_all': today_nutrition.count_all
            }
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    elif request.method == 'POST':
        if request.user.is_authenticated:
            date_list = date.split('-')
            today = datetime.date(int(date_list[0]), int(
                date_list[1]), int(date_list[2]))
            req_data = json.loads(request.body.decode())
            calories = int(req_data['calories'])
            carbs = int(req_data['carbs'])
            protein = int(req_data['protein'])
            fat = int(req_data['fat'])
            count_all = int(req_data['count_all'])

            new_record = UserNutrition(
                user=request.user,
                date=today,
                calories=calories,
                carbs=carbs,
                protein=protein,
                fat=fat,
                count_all=count_all)
            new_record.save()

            response_dict = {
                'calories': new_record.calories,
                'carbs': new_record.carbs,
                'protein': new_record.protein,
                'fat': new_record.fat,
                'count_all': new_record.count_all,
            }
            return JsonResponse(response_dict, status=201)
        else:
            return HttpResponse(status=401)
    elif request.method == 'PUT':
        if request.user.is_authenticated:
            req_data = json.loads(request.body.decode())
            date_list = date.split('-')
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
            new_count_all = int(req_data['count_all'])

            today_nutrition.calories = new_calories
            today_nutrition.carbs = new_carbs
            today_nutrition.protein = new_protein
            today_nutrition.fat = new_fat
            today_nutrition.count_all = new_count_all
            today_nutrition.save()

            response_dict = {
                'calories': today_nutrition.calories,
                'carbs': today_nutrition.carbs,
                'protein': today_nutrition.protein,
                'fat': today_nutrition.fat,
                'count_all': today_nutrition.count_all,
            }
            return JsonResponse(response_dict, status=200)
        else:
            return HttpResponse(status=401)
    else:
        return HttpResponseNotAllowed(['GET', 'POST', 'PUT'])


def nutrition_count(request, date):   ## used for recommendation page
    # if not request.user.is_authenticated:
    #     return HttpResponse(status=401)

    if request.method == 'GET':
        date_list = date.split('-')
        today = datetime.date(int(date_list[0]), int(
            date_list[1]), int(date_list[2]))
        try:
            today_nutrition = UserNutrition.objects.get(
                user_id=request.user.id, date=today)
        except UserNutrition.DoesNotExist:
            response_dict = {
                'count_all': 0
            }
            return JsonResponse(response_dict, status=200)
        response_dict = {
            'count_all': today_nutrition.count_all
        }
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


def record(request):
    if request.method == "GET":
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## return all records
        all_record_list = list(Record.objects.all().values())
        return JsonResponse(all_record_list, safe=False)

    if request.method == "POST":
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## decode request
        req_data = json.loads(request.body.decode())
        menu_name = req_data['menu']
        review_text = req_data['review']
        liked = req_data['liked'] == "True"

        new_record = Record(user = request.user,
                                menu = Menu.objects.get(name = menu_name),
                                review = review_text,
                                liked = liked,
                                date = datetime.date.today(),
                                image = req_data['image'])
        new_record.save()

        ## respond with created record detail
        response_dict = {'id' : new_record.id,
                            'user_id' : new_record.user.id,
                            'menu_id' : new_record.menu.id,
                            'review' : new_record.review,
                            'liked' : new_record.liked,
                            'date' : new_record.date.strftime("%Y-%m-%d"),
                            'image' : new_record.image.url}
        return JsonResponse(response_dict)
    return HttpResponseNotAllowed(["GET", "POST"])

@require_GET
def record_id_func(request, record_id):
    ## If user is not signed in, respond with 401
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)
        
    ## If record of record_id does not exist, respond with 404
    if not Record.objects.filter(id = record_id).exists():
        return HttpResponse(status = 404)

    ## return record of record_id
    matching_record = Record.objects.get(id = record_id)
    response_dict = {'id' : record_id,
                    'user_id' : matching_record.user.id,
                    'menu_id' : matching_record.menu.id,
                    'review' : matching_record.review,
                    'liked' : matching_record.liked,
                    'date' : matching_record.date,
                    'image' : matching_record.image.url}
    return JsonResponse(response_dict)

@require_GET
def record_user_id(request, user_id):
    ## If user is not signed in, respond with 401
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)

    ## Get all records whose user id is user_id
    all_record_list = [record for record in Record.objects.all().values() if record["user_id"] == user_id]

    ## If there are no such records, respond with 404
    if len(all_record_list) == 0:
        return HttpResponse(status = 404)
    ## else, return records
    return JsonResponse(all_record_list, safe = False)

def review(request, review_record_id):
    ## if request method is not GET, POST, PUT, or DELETE, respond with 405
    if request.method not in ['GET', 'POST', 'PUT', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])

    ## If user is not signed in, respond with 401
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)

    ## If record of record_id does not exist, respond with 404
    if not Record.objects.filter(id = review_record_id).exists():
        return HttpResponse(status = 404)

    ## If request is not from the user of the record, respond with 403
    if Record.objects.get(id = review_record_id).user.id != request.user.id:
        return HttpResponse(status = 403)

    if request.method == "GET":
        matching_review = Record.objects.get(id = review_record_id).review
        return JsonResponse({'review' : matching_review})

    if request.method == "POST":
        ## create review in selected record
        review_post = json.loads(request.body.decode())['review']
        record_to_add_review = Record.objects.get(id = review_record_id)
        record_to_add_review.review = review_post
        record_to_add_review.save()

        ## respond with the edited record
        response_dict = {'id' : review_record_id,
                        'user_id' : record_to_add_review.user.id,
                        'menu_id' : record_to_add_review.menu.id,
                        'review' : record_to_add_review.review,
                        'liked' : record_to_add_review.liked,
                        'date' : record_to_add_review.date,
                        'image' : record_to_add_review.image.url}
        return JsonResponse(response_dict)

    if request.method == "PUT":
        ## edit review in selected record
        new_review = json.loads(request.body.decode())['review']
        record_to_edit_review = Record.objects.get(id = review_record_id)
        record_to_edit_review.review = new_review
        record_to_edit_review.save()

        ## respond with the edited record
        response_dict = {'id' : review_record_id,
                        'user_id' : record_to_edit_review.user.id,
                        'menu_id' : record_to_edit_review.menu.id,
                        'review' : record_to_edit_review.review,
                        'liked' : record_to_edit_review.liked,
                        'date' : record_to_edit_review.date,
                        'image' : record_to_edit_review.image.url}
        return JsonResponse(response_dict)

    if request.method == "DELETE":
        ## delete review of selected record
        record_to_delete_review = Record.objects.get(id = review_record_id)
        record_to_delete_review.review = ""
        record_to_delete_review.save()

        ## respond with the edited record
        response_dict = {'id' : review_record_id,
                        'user_id' : record_to_delete_review.user.id,
                        'menu_id' : record_to_delete_review.menu.id,
                        'review' : record_to_delete_review.review,
                        'liked' : record_to_delete_review.liked,
                        'date' : record_to_delete_review.date,
                        'image' : record_to_delete_review.image.url}
        return JsonResponse(response_dict)


@require_http_methods(["PUT"])
def liked(request, liked_record_id):
    ## If user is not signed in, respond with 401
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)

    ## If record of liked_record_id does not exist, respond with 404
    if not Record.objects.filter(id = liked_record_id).exists():
        return HttpResponse(status = 404)

    ## If request is not from the user of the record, respond with 403
    if Record.objects.get(id = liked_record_id).user.id != request.user.id:
        return HttpResponse(status = 403)

    record_to_toggle_liked = Record.objects.get(id = liked_record_id)
    record_to_toggle_liked.liked = not record_to_toggle_liked.liked

    response_dict = {'id' : liked_record_id,
                    'user_id' : record_to_toggle_liked.user.id,
                    'menu_id' : record_to_toggle_liked.menu.id,
                    'review' : record_to_toggle_liked.review,
                    'liked' : record_to_toggle_liked.liked,
                    'date' : record_to_toggle_liked.date,
                    'image' : record_to_toggle_liked.image.url}
    return JsonResponse(response_dict)


@require_GET
def menu(request):
    ## If user is not signed in, respond with 401
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)

    ## return all menus
    all_menu_list = list(Menu.objects.all().values())
    return JsonResponse(all_menu_list, safe=False)

@require_GET
def menu_name(request, menuname):
    ## If user is not signed in, respond with 401
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)
        
    ## If there are no menus with menu_name, respond with 404
    if not Menu.objects.filter(name = menuname).exists():
        return HttpResponse(status = 404)

    ## return corresponding menu
    matching_menu = Menu.objects.get(name = menuname)
    response_dict = {'id' : matching_menu.id, 'name' : menuname, 'calories' : matching_menu.calories,
                    'carbs' : matching_menu.carbs, 'protein' : matching_menu.protein,
                    'fat' : matching_menu.fat, 'image' : matching_menu.image.url,
                    'recipe': matching_menu.recipe, 'ingredient': matching_menu.ingredient }
    return JsonResponse(response_dict)
    
@ensure_csrf_cookie
@require_GET
def token(request):
    return HttpResponse(status=204)

# def detection(request):
#     if request.method in ['GET', 'PUT', 'DELETE']:
#         return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
#     if not request.user.is_authenticated:
#         return HttpResponse(status = 401)
#     user = request.user
#     api_company_token = api.api_company_token
#     api_user_token = api.api_user_token
#     images_path = api.images_path

#     req_data = json.loads(request.body.decode())
#     img_filename = req_data['file']

#     img = api.preprocess(os.path.join(images_path, img_filename))

#     result_list = api.menu_recognition(img, user_token=api_user_token)

#     return JsonResponse(result_list)

## recommend 15 menus total(5 for each meal)
def recommend(request, date):
    # if unauthenticated
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)
    
    date_list = date.split('-')
    today = datetime.date(int(date_list[0]), 
            int(date_list[1]), int(date_list[2]))

    if request.method == 'GET':
        # find the user's nutritional info
        try:
            today_menu = TodayMenu.objects.get(
                user_id = request.user.id, date=today
            )
        except TodayMenu.DoesNotExist:
            response = recommend_algorithm(request, today, 0)
            print(response)
            print(request.user)
            today_menu = TodayMenu.objects.create(
                user_id=request.user.id,
                count=0,
                date=today,
                breakfast=response[0],
                lunch=response[1],
                dinner=response[2],
                breakfast_other1 = response[3],
                breakfast_other2 = response[4],
                breakfast_other3 = response[5],
                breakfast_other4 = response[6],
                lunch_other1 = response[7],
                lunch_other2 = response[8],
                lunch_other3 = response[9],
                lunch_other4 = response[10],
                dinner_other1 = response[11],
                dinner_other2 = response[12],
                dinner_other3 = response[13],
                dinner_other4 = response[14]
            )
            today_menu.save()
            response_dict = []
            if len(response)!=0:
                for res in response:
                    response_dict.append({
                        'id': res.id,
                        'name': res.name,
                        'calories': res.calories,
                        'carbs': res.carbs,
                        'protein': res.protein,
                        'fat': res.fat,
                        'image': "http://localhost:8000/media/"+str(res.image).split('/')[-1],
                        'recipe': res.recipe,
                        'ingredient': res.ingredient
                    })
            return JsonResponse(response_dict, safe=False)
        
        count = len(Record.objects.filter(user_id=request.user.id, date=today))  
        if count == today_menu.count:    # no new records were made
            response_dict = []
            dict = model_to_dict(today_menu)
            for key, value in dict.items():
                print(key, ", ", value)
                if key=='id' or key=='user' or key=='count' or key=='date':
                    continue
                else:
                    menu = Menu.objects.get(id=value)
                    response_dict.append({
                        'id': menu.id,
                        'name': menu.name,
                        'calories': menu.calories,
                        'carbs': menu.carbs,
                        'protein': menu.protein,
                        'fat': menu.fat,
                        'image': "http://localhost:8000/media/"+str(menu.image).split('/')[-1],
                        'recipe': menu.recipe,
                        'ingredient': menu.ingredient
                    })
            return JsonResponse(response_dict, safe=False)

        today_menu.count = count   # update today_menu.count
        today_menu.save()
        
        try:
            count_all = UserNutrition.objects.get(user_id=request.user.id, date=today).count_all
        except UserNutrition.DoesNotExist:   # there should not be such a case like this -> if there is a record, then UserNutrition exits
            count_all = 0

        response = recommend_algorithm(request, today, count_all)
        if count_all==0:
            today_menu.breakfast = response[0]
            today_menu.lunch = response[1]
            today_menu.dinner = response[2]
            today_menu.breakfast_other1 = response[3]
            today_menu.breakfast_other2 = response[4]
            today_menu.breakfast_other3 = response[5]
            today_menu.breakfast_other4 = response[6]
            today_menu.lunch_other1 = response[7]
            today_menu.lunch_other2 = response[8]
            today_menu.lunch_other3 = response[9]
            today_menu.lunch_other4 = response[10]
            today_menu.dinner_other1 = response[11]
            today_menu.dinner_other2 = response[12]
            today_menu.dinner_other3 = response[13]
            today_menu.dinner_other4 = response[14]
        elif count_all == 1:
            today_menu.lunch = response[1]
            today_menu.dinner = response[2]
            today_menu.lunch_other1 = response[7]
            today_menu.lunch_other2 = response[8]
            today_menu.lunch_other3 = response[9]
            today_menu.lunch_other4 = response[10]
            today_menu.dinner_other1 = response[11]
            today_menu.dinner_other2 = response[12]
            today_menu.dinner_other3 = response[13]
            today_menu.dinner_other4 = response[14]
        elif count_all == 2:
            today_menu.dinner = response[2]
            today_menu.dinner_other1 = response[11]
            today_menu.dinner_other2 = response[12]
            today_menu.dinner_other3 = response[13]
            today_menu.dinner_other4 = response[14]
        today_menu.save()

        response_dict = []
        dict = model_to_dict(today_menu)
        for key, value in dict.items():
            if key=='id' or key=='user' or key=='count' or key=='date':
                continue
            else:
                menu = Menu.objects.get(id=value)
                response_dict.append({
                    'id': menu.id,
                    'name': menu.name,
                    'calories': menu.calories,
                    'carbs': menu.carbs,
                    'protein': menu.protein,
                    'fat': menu.fat,
                    'image': "http://localhost:8000/media/"+str(menu.image).split('/')[-1],
                    'recipe': menu.recipe,
                    'ingredient': menu.ingredient
                })
        return JsonResponse(today_menu, safe=False)
    
    elif request.method == 'PUT':
        idx = json.loads(request.body.decode())
        # print(req_data)
        # idx = req_data['idx']
        # idx = int(idx)
        try:
            today_menu = TodayMenu.objects.get(user_id = request.user.id, date=today)
        except TodayMenu.DoesNotExist:
            return HttpResponse(status=404)

        if idx >= 3 and idx <= 6:
            temp = today_menu.breakfast
            if idx == 3:
                today_menu.breakfast = today_menu.breakfast_other1
                today_menu.breakfast_other1 = temp
            elif idx == 4:
                today_menu.breakfast = today_menu.breakfast_other2
                today_menu.breakfast_other2 = temp
            elif idx == 5:
                today_menu.breakfast = today_menu.breakfast_other3
                today_menu.breakfast_other3 = temp
            else:
                today_menu.breakfast = today_menu.breakfast_other4
                today_menu.breakfast_other4 = temp
            today_menu.save()
        elif idx >= 7 and idx <= 10:
            temp = today_menu.lunch
            if idx == 7:
                today_menu.lunch = today_menu.lunch_other1
                today_menu.lunch_other1 = temp
            elif idx == 8:
                today_menu.lunch = today_menu.lunch_other2
                today_menu.lunch_other2 = temp
            elif idx == 9:
                today_menu.lunch = today_menu.lunch_other3
                today_menu.lunch_other3 = temp
            else:
                today_menu.lunch = today_menu.lunch_other4
                today_menu.lunch_other4 = temp
            today_menu.save()
        else:
            temp = today_menu.dinner
            if idx == 11:
                today_menu.dinner = today_menu.dinner_other1
                today_menu.dinner_other1 = temp
            elif idx == 12:
                today_menu.dinner = today_menu.dinner_other2
                today_menu.dinner_other2 = temp
            elif idx == 13:
                today_menu.dinner = today_menu.dinner_other3
                today_menu.dinner_other3 = temp
            else:
                today_menu.dinner = today_menu.dinner_other4
                today_menu.dinner_other4 = temp
            today_menu.save()

        response_dict = []
        dict = model_to_dict(today_menu)
        for key, value in dict.items():
            if key=='id' or key=='user' or key=='count' or key=='date':
                continue
            else:
                menu = Menu.objects.get(id=value)
                response_dict.append({
                    'id': menu.id,
                    'name': menu.name,
                    'calories': menu.calories,
                    'carbs': menu.carbs,
                    'protein': menu.protein,
                    'fat': menu.fat,
                    'image': "http://localhost:8000/media/"+str(menu.image).split('/')[-1],
                    'recipe': menu.recipe,
                    'ingredient': menu.ingredient
                })
        return JsonResponse(response_dict, safe=False)
    
    else:
        return HttpResponseNotAllowed(['GET','PUT'])


## internal function
def recommend_algorithm(request, today, count_all):
    try:
        today_nutrition = UserNutrition.objects.get(
            user_id=request.user.id, date=today)
    except UserNutrition.DoesNotExist:     
        today_nutrition = UserNutrition(
            user_id=request.user.id,
            date=today,
            calories=0,
            carbs=0,
            protein=0,
            fat=0
        )
    # left meal times 
    times = (3 - count_all)
    if times == 0:
        response_dict = []
        return response_dict

    # target_cal = Profile.objects.get(user_id=request.user.id).target_calories
    target_cal = 2000
    target_carbs = ((target_cal*0.5)/4)
    target_protein = ((target_cal*0.3)/4)
    target_fat = ((target_cal*0.2)/9)

    # allowed calories, carbs, protein, fat per meal
    allowed_cal = (target_cal - float(today_nutrition.calories)) / times
    allowed_carbs = (target_carbs - float(today_nutrition.carbs)) / times
    allowed_protein = (target_protein - float(today_nutrition.protein)) / times
    allowed_fat = (target_fat - float(today_nutrition.fat)) / times

    menus = Menu.objects.all()
    candidates = []
    print('calories:', allowed_cal)
    print('carbs:', allowed_carbs)
    print('protein:', allowed_protein)
    print('fat:', allowed_fat)
    # choose all candidates
    for menu in menus:
        if menu.calories < allowed_cal and menu.carbs < allowed_carbs and menu.protein < allowed_protein and menu.fat < allowed_fat:
            # check ingredients
            preference = Preference.objects.filter(user_id=request.user.id) # list
            ingredient = re.findall("'(.*?)'", menu.ingredient)  # list
            intersect = set(preference) & set(ingredient)
            if intersect:   # if there is intersection, do not include
                continue
            else:  # no intersection
                difference = (allowed_cal - menu.calories) + (allowed_carbs - menu.carbs) + (allowed_protein - menu.protein) + (allowed_fat - menu.fat)
                menu = [
                    menu,
                    difference
                ]
                candidates.append(menu)
        else:
            continue
    
    # sort in the order of little difference with the target nutrition
    candidates = sorted(candidates, key=lambda x:x[1])
    # select the ones with like
    liked_menus = []
    liked_records = Record.objects.filter(user_id=request.user.id, liked=True)
    for rec in liked_records:
        for can in candidates:
            if can[0].name == rec.menu.name:
                liked_menus.append(can[0])
    
    result = []
    liked_num = len(liked_menus)
    if liked_num != 0:
        result.extend(liked_menus)
    
    if len(candidates) < 15:
        for can in candidates:
            result.append(can[0])
    else:
        for can in candidates:
            if liked_num < 15:
                result.append(can[0])
                liked_num+=1
            else:
                break

    response_dict = []
    for res in result:
        response_dict.append(res)   # type(res) == queryset

    return response_dict

