from django.http import HttpResponse, HttpResponseNotAllowed
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
import json
from .models import Menu, Recipe, Record
import datetime

# Create your views here.
@ensure_csrf_cookie
def record(request):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## return all records
        all_record_list = [record for record in Record.objects.all().values()]
        return JsonResponse(all_record_list, safe=False)

    elif request.method == 'POST':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## decode request
        req_data = json.loads(request.body.decode())
        menu_id = req_data['menu_id']
        recipe_id = req_data['recipe_id']
        review = req_data['review']
        liked = True if req_data['liked'] == "True" else False
        ## req_data['date'] comes in YYYY-MM-DD form, transform the string into datetime object
        date_list = req_data['date'].split('-')
        date = datetime.date(int(date_list[0]), int(date_list[1]), int(date_list[2]))
        
        record = Record(user = request.user, menu = Menu.objects.get(id = menu_id), 
                        recipe = Recipe.objects.get(id = recipe_id), review = review, liked = liked, date = date)
        record.save()

        ## respond with created record detail
        response_dict = {'id' : record.id, 'user' : record.user, 'menu' : record.menu, 'recipe' : record.recipe,
                        'review' : record.review, 'liked' : record.liked, 'date' : record.date}
        return HttpResponse(json.dumps(response_dict), status = 201)

    else:
        return HttpResponseNotAllowed(['GET', 'POST'])


@ensure_csrf_cookie
def recordID(request, record_id):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)
        
        ## If record of record_id does not exist, respond with 404
        if not Record.objects.filter(id = record_id).exists():
            return HttpResponse(status = 404)

        ## return record of record_id
        matchingRecord = Record.objects.get(id = record_id)
        response_dict = {'id' : record_id, 'user_id' : matchingRecord.user.id, 'menu_id' : matchingRecord.menu.id, 
                        'recipe_id' : matchingRecord.recipe.id, 'review' : matchingRecord.review, 
                        'liked' : matchingRecord.liked, 'date' : matchingRecord.date}
        return JsonResponse(response_dict)

    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def recordUserID(request, user_id):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## Get all records whose user id is user_id
        all_record_list = [record for record in Record.objects.all().values() if record["user_id"] == user_id]

        ## If there are no such records, respond with 404
        if len(all_record_list) == 0:
            return HttpResponse(status = 404)
        ## else, return records
        else:
            return JsonResponse(all_record_list, safe = False)

    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def review(request, record_id):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## If record of record_id does not exist, respond with 404
        if not Record.objects.filter(id = record_id).exists():
            return HttpResponse(status = 404)

        matchingReview = Record.objects.get(id = record_id).review
        return JsonResponse({'review' : matchingReview})

    elif request.method == 'POST':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## If record of record_id does not exist, respond with 404
        if not Record.objects.filter(id = record_id).exists():
            return HttpResponse(status = 404)

        ## If post request is not from the user of the record, respond with 403
        if Record.objects.get(id = record_id).user_id.id != request.user.id:
            return HttpResponse(status = 403)

        ## create review in selected record
        review = json.loads(request.body.decode())['review']
        recordToAddReview = Record.objects.get(id = record_id)
        recordToAddReview.review = review
        recordToAddReview.save()

        ## respond with the edited record
        response_dict = {'id' : record_id, 'user_id' : recordToAddReview.user.id, 'menu_id' : recordToAddReview.menu.id, 
                        'recipe_id' : recordToAddReview.recipe.id, 'review' : recordToAddReview.review, 
                        'liked' : recordToAddReview.liked, 'date' : recordToAddReview.date}
        return HttpResponse(json.dumps(response_dict), status = 200)

    elif request.method == 'PUT':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## If record of record_id does not exist, respond with 404
        if not Record.objects.filter(id = record_id).exists():
            return HttpResponse(status = 404)

        ## If put request is not from the user of the record, respond with 403
        if Record.objects.get(id = record_id).user_id.id != request.user.id:
            return HttpResponse(status = 403)

        ## edit review in selected record
        newReview = json.loads(request.body.decode())['review']
        recordToEditReview = Record.objects.get(id = record_id)
        recordToEditReview.review = newReview
        recordToEditReview.save()

        ## respond with the edited record
        response_dict = {'id' : record_id, 'user_id' : recordToEditReview.user.id, 'menu_id' : recordToEditReview.menu.id, 
                        'recipe_id' : recordToEditReview.recipe.id, 'review' : recordToEditReview.review, 
                        'liked' : recordToEditReview.liked, 'date' : recordToEditReview.date}
        return HttpResponse(json.dumps(response_dict), status = 200)

    elif request.method == 'DELETE':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## If record of record_id does not exist, respond with 404
        if not Record.objects.filter(id = record_id).exists():
            return HttpResponse(status = 404)

        ## If delete request is not from the user of the record, respond with 403
        if Record.objects.get(id = record_id).user_id.id != request.user.id:
            return HttpResponse(status = 403)

        ## delete review of selected record
        recordToDeleteReview = Record.objects.get(id = record_id)
        recordToDeleteReview.review = ""
        recordToDeleteReview.save()

        ## respond with the edited record
        response_dict = {'id' : record_id, 'user_id' : recordToDeleteReview.user.id, 'menu_id' : recordToDeleteReview.menu.id, 
                        'recipe_id' : recordToDeleteReview.recipe.id, 'review' : recordToDeleteReview.review, 
                        'liked' : recordToDeleteReview.liked, 'date' : recordToDeleteReview.date}
        return HttpResponse(json.dumps(response_dict), status = 200)


@ensure_csrf_cookie
def recipeMenuName(request, menu_name):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## If there are no menus with menu_name, respond with 404
        if not Menu.objects.filter(name = menu_name).exists():
            return HttpResponse(status = 404)

        ## find the menu id and the recipe object corresponding to the menu_name
        matchingMenuID = Menu.objects.get(name = menu_name).id
        matchingRecipe = [recipe for recipe in Recipe.objects.all().values() if recipe["menu_id"] == matchingMenuID]

        ## if there are no recipes corresponding to the menu id, respond with 404
        ## else, return the correct recipe
        if len(matchingRecipe) == 0:
            return HttpResponse(status = 404)
        else:
            return JsonResponse({'recipe' : matchingRecipe[0]["recipe"]})

    else:
        return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def menu(request):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## return all menus
        all_menu_list = [menu for menu in Menu.objects.all().values()]
        return JsonResponse(all_menu_list, safe=False)

    else:
        return HttpResponseNotAllowed(['GET'])

@ensure_csrf_cookie
def menuName(request, menu_name):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)
        
        ## If there are no menus with menu_name, respond with 404
        if not Menu.objects.filter(name = menu_name).exists():
            return HttpResponse(status = 404)

        ## return corresponding menu
        matchingMenu = Menu.objects.get(name = menu_name)
        response_dict = {'id' : matchingMenu.id, 'name' : menu_name, 'calories' : matchingMenu.calories, 
                        'protein' : matchingMenu.protein, 'fat' : matchingMenu.fat, 'image' : matchingMenu.image.url}
        return JsonResponse(response_dict)

    else:
        return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    else:
        return HttpResponseNotAllowed(['GET'])