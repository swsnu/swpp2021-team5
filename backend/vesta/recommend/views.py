import json
import re
import datetime
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotAllowed
from django.http.response import JsonResponse
from django.forms.models import model_to_dict
from kitchen.models import Record, UserNutrition, Preference, Menu, Profile
from .models import TodayMenu

# Create your views here.
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
        except TodayMenu.DoesNotExist:  # first recommendation of the day
            response = recommend_algorithm(request, today, 0)
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
                    if res is not None:
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
                    else:
                        response_dict.append(None)
            return JsonResponse(response_dict, safe=False)
        
        count = len(Record.objects.filter(user_id=request.user.id, date=today))  
        if count == today_menu.count:    # no new records were made
            response_dict = []
            dict = model_to_dict(today_menu)
            for key, value in dict.items():
                # print(key, ", ", value)
                if key in ('id', 'user', 'count', 'date'):
                    continue
                else:
                    try:
                        menu = Menu.objects.get(id=value)
                        print(str(menu.image).split('/')[-1])
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
                    except Menu.DoesNotExist:
                        response_dict.append(None)
            return JsonResponse(response_dict, safe=False)

        today_menu.count = count   # if you ate something else including snack, update today_menu.count
        today_menu.save()
        
        try:  # count times of MEAL (not snack)
            count_all = UserNutrition.objects.get(user_id=request.user.id, date=today).count_all
        except UserNutrition.DoesNotExist:   # there should not be such a case like this -> if there is a record, then UserNutrition exits
            count_all = 0

        if count_all == 3:   # if count_all == 3, just return the same todayMenu
            response_dict = []
            dict = model_to_dict(today_menu)
            for key, value in dict.items():
                if key in ('id', 'user', 'count', 'date'):
                    continue
                else:
                    try:
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
                    except Menu.DoesNotExist:
                        response_dict.append(None)
            return JsonResponse(response_dict, safe=False)

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
            today_menu.lunch = response[0]
            today_menu.dinner = response[1]
            today_menu.lunch_other1 = response[2]
            today_menu.lunch_other2 = response[3]
            today_menu.lunch_other3 = response[4]
            today_menu.lunch_other4 = response[5]
            today_menu.dinner_other1 = response[6]
            today_menu.dinner_other2 = response[7]
            today_menu.dinner_other3 = response[8]
            today_menu.dinner_other4 = response[9]
        elif count_all == 2:
            today_menu.dinner = response[0]
            today_menu.dinner_other1 = response[1]
            today_menu.dinner_other2 = response[2]
            today_menu.dinner_other3 = response[3]
            today_menu.dinner_other4 = response[4]
        today_menu.save()

        response_dict = []
        dict = model_to_dict(today_menu)
        for key, value in dict.items():
            if key in ('id', 'user', 'count', 'date'):
                continue
            else:
                try:
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
                except Menu.DoesNotExist:
                    response_dict.append(None)
        return JsonResponse(response_dict, safe=False)
    
    elif request.method == 'PUT':
        idx = json.loads(request.body.decode())
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
            if key in ('id', 'user', 'count', 'date'):
                continue
            else:
                try:
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
                except Menu.DoesNotExist:
                    response_dict.append(None)
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

    target_cal = Profile.objects.get(user_id=request.user.id).target_calories
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
    # print('calories:', allowed_cal)
    # print('carbs:', allowed_carbs)
    # print('protein:', allowed_protein)
    # print('fat:', allowed_fat)
    # choose all candidates
    for menu in menus:
        if (menu.calories < allowed_cal) and (menu.carbs < allowed_carbs) and (menu.protein < allowed_protein) and (menu.fat < allowed_fat):
            # check ingredients
            preferences = Preference.objects.filter(user_id=request.user.id) # QuerySet
            preference = []
            for pref in preferences:
                pref = model_to_dict(pref)
                for key, value in pref.items():
                    if key in ('id', 'user'):
                        continue
                    else:
                        preference.append(value)
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
    
    if len(candidates) < 15: # if candidates are less than 15
        for can in candidates:
            result.append(can[0])  
        while len(result) != 15:
            result.append(None)
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
