import json
import datetime
from django.http import HttpResponse, HttpResponseNotAllowed
from django.http.response import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_GET, require_http_methods
from .models import Menu, Recipe, Record

# Create your views here.
@require_http_methods(["GET", "POST"])
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
        menu_id = req_data['menu_id']
        recipe_id = req_data['recipe_id']
        review_text = req_data['review']
        liked = req_data['liked'] == "True"
        ## req_data['date'] comes in YYYY-MM-DD form, transform the string into datetime object
        date_list = req_data['date'].split('-')
        date = datetime.date(int(date_list[0]), int(date_list[1]), int(date_list[2]))

        new_record = Record(user = request.user,
                        menu = Menu.objects.get(id = menu_id),
                        recipe = Recipe.objects.get(id = recipe_id),
                        review = review_text,
                        liked = liked,
                        date = date)
        new_record.save()

        ## respond with created record detail
        response_dict = {'id' : new_record.id,
                        'user' : new_record.user,
                        'menu' : new_record.menu,
                        'recipe' : new_record.recipe,
                        'review' : new_record.review,
                        'liked' : new_record.liked,
                        'date' : new_record.date}
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(["GET", "POST"])

@require_GET
def record_ID(request, record_id):
    if request.method == 'GET':
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
                        'recipe_id' : matching_record.recipe.id,
                        'review' : matching_record.review,
                        'liked' : matching_record.liked,
                        'date' : matching_record.date}
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(['GET'])

@require_GET
def record_user_id(request, user_id):
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
        return JsonResponse(all_record_list, safe = False)

    return HttpResponseNotAllowed(['GET'])



def review(request, review_record_id):
    if request.method == "GET":
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## If record of record_id does not exist, respond with 404
        if not Record.objects.filter(id = review_record_id).exists():
            return HttpResponse(status = 404)

        matching_review = Record.objects.get(id = review_record_id).review
        return JsonResponse({'review' : matching_review})

    
    ## If user is not signed in, respond with 401
    if not request.user.is_authenticated:
        return HttpResponse(status = 401)

    ## If record of record_id does not exist, respond with 404
    if not Record.objects.filter(id = review_record_id).exists():
        return HttpResponse(status = 404)

    ## If post request is not from the user of the record, respond with 403
    if Record.objects.get(id = review_record_id).user_id.id != request.user.id:
        return HttpResponse(status = 403)

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
                        'recipe_id' : record_to_add_review.recipe.id,
                        'review' : record_to_add_review.review,
                        'liked' : record_to_add_review.liked,
                        'date' : record_to_add_review.date}
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
                        'recipe_id' : record_to_edit_review.recipe.id,
                        'review' : record_to_edit_review.review,
                        'liked' : record_to_edit_review.liked,
                        'date' : record_to_edit_review.date}
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
                        'recipe_id' : record_to_delete_review.recipe.id,
                        'review' : record_to_delete_review.review,
                        'liked' : record_to_delete_review.liked,
                        'date' : record_to_delete_review.date}
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(['GET', 'POST', 'PUT', 'DELETE'])


@require_GET
def recipe_menu_name(request, menu_name_recipe):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## If there are no menus with menu_name_recipe, respond with 404
        if not Menu.objects.filter(name = menu_name_recipe).exists():
            return HttpResponse(status = 404)

        ## find the menu id and the recipe object corresponding to the menu_name_recipe
        matching_menu_id = Menu.objects.get(name = menu_name_recipe).id
        matching_recipe = [recipe for recipe in Recipe.objects.all().values() if recipe["menu_id"] == matching_menu_id]

        ## if there are no recipes corresponding to the menu id, respond with 404
        ## else, return the correct recipe
        if len(matching_recipe) == 0:
            return HttpResponse(status = 404)
        return JsonResponse({'recipe' : matching_recipe[0]["recipe"]})

    return HttpResponseNotAllowed(['GET'])


@require_GET
def menu(request):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)

        ## return all menus
        all_menu_list = list(Menu.objects.all().values())
        return JsonResponse(all_menu_list, safe=False)

    return HttpResponseNotAllowed(['GET'])


@require_GET
def menu_name(request, menuname):
    if request.method == 'GET':
        ## If user is not signed in, respond with 401
        if not request.user.is_authenticated:
            return HttpResponse(status = 401)
        
        ## If there are no menus with menu_name, respond with 404
        if not Menu.objects.filter(name = menuname).exists():
            return HttpResponse(status = 404)

        ## return corresponding menu
        matching_menu = Menu.objects.get(name = menuname)
        response_dict = {'id' : matching_menu.id, 'name' : menuname, 'calories' : matching_menu.calories,
                        'protein' : matching_menu.protein, 'fat' : matching_menu.fat, 'image' : matching_menu.image.url}
        return JsonResponse(response_dict)

    return HttpResponseNotAllowed(['GET'])


@ensure_csrf_cookie
@require_GET
def token(request):
    if request.method == 'GET':
        return HttpResponse(status=204)
    return HttpResponseNotAllowed(['GET'])
