import json
import datetime
from django.db.models.fields import NullBooleanField
from django.http import HttpResponse, HttpResponseNotAllowed
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.http import require_http_methods, require_GET

from django.contrib.auth.models import User
from .models import Profile, UserNutrition, Preference, Menu, Record
from . import logmeal as api
import os
import base64

# Create your views here.

@require_http_methods(["POST"])
def signup(request):
    if request.method == 'POST':
        req_data = json.loads(request.body.decode())
        username = req_data['username']
        password = req_data['password']
        user = User.objects.create_user(username=username, password=password)

        # Model 'Profile' should be created simultaneously #
        age = int(req_data['age'])
        sex = bool(req_data['sex'])
        height = int(req_data['height'])
        weight = int(req_data['weight'])
        target_calories = int(req_data['targetCalories'])

        api_name = "APIUser_namKim"+username
        userdict = api.signup(api_name)
        # .

        new_profile = Profile(
            user=user, 
            age=age, 
            sex=sex, 
            height=height, 
            weight=weight, 
            target_calories=target_calories,
            api_name = api_name,
            api_token = userdict["token"],
            api_id = userdict["id"],
        )
        new_profile.save()
        return HttpResponse(status=201)
    else:
        return HttpResponseNotAllowed['POST']

@require_http_methods(["GET"])
def signup_check_avail(request, username):
    if request.method == 'GET':
        response_dict = {
            'availability': not User.objects.filter(username = username).exists()
        }
        return JsonResponse(response_dict, status=200)
    else:
        return HttpResponseNotAllowed(['GET'])


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
        return HttpResponseNotAllowed(['POST'])

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
        try:
            api_id = user.profile.api_id
            api.resign(api_id)
        except:
            pass
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
                food_preference_list.append(str(item.ingredient))

            user_profile = user.profile
            response_dict = {
                'username': user.username,
                'age': user_profile.age,
                'sex': user_profile.sex,
                'height': user_profile.height,
                'weight': user_profile.weight,
                'preference': food_preference_list,
                'targetCalories': user_profile.target_calories,
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
            user_profile.target_calories = int(req_data['targetCalories'])
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
                food_preference_list_response.append(str(item.ingredient))

            response_dict = {
                'username': user.username,
                'age': user_profile.age,
                'sex': user_profile.sex,
                'height': user_profile.height,
                'weight': user_profile.weight,
                'preference': food_preference_list_response,
                'target_calories': user_profile.target_calories
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
                response_dict = {
                    #'date': today_nutrition.date.strftime('%Y-%m-%d'),
                    'calories': 0,
                    'carbs': 0,
                    'protein': 0,
                    'fat': 0,
                    'count_all': 0
                }
                return JsonResponse(response_dict, status=200)
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
    if not request.user.is_authenticated:
        return HttpResponse(status=401)

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

def detection(request):
    if request.method in ['GET', 'PUT', 'DELETE']:
        return HttpResponseNotAllowed(['GET', 'PUT', 'DELETE'])
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)
    user = request.user

    api_company_token = api.api_company_token
    try:
        api_user_token = Profile.objects.get(user=user).api_token
    except:
        api_user_token = api.api_user_token
    # images_path = api.images_path

    # req_data = json.loads(request.body.decode())
    # img_filename = req_data['file']

    # img = api.preprocess(os.path.join(images_path, img_filename))
    print(request.POST.keys())
    img = request.POST['image'] # gets only 1 file
    # img = base64.b64decode(img[23:])

    # img = api.preprocess(os.path.join(images_path, img_filename))

    result_list = api.menu_recognition(img[23:], user_token=api_user_token)

    return JsonResponse(result_list, safe=False)
