# pylint: skip-file
import csv
import django
import re
import os
from django.conf import settings

# path needs to be changed
CSV_PATH = '/Users/kimnamgi/Desktop/swpp2021-team5/backend/vesta/RAW_recipes.csv'
IMAGE_PATH = '/Users/kimnamgi/Desktop/swpp2021-team5/backend/vesta/menu_images/'

def parse_nutrition(nutrition):
    return re.findall("(\d+\.\d+)", nutrition)

def organize_recipe(recipe):
    pattern = re.findall("'(.*?)'", recipe)
    idx = 0
    result = []
    for p in pattern:
        idx += 1
        result.append(str(idx) +". " + p)
    return result

def organize_ingredient(ingredient):
    pattern = re.findall("'(.*?)'", ingredient)
    return pattern

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "vesta.settings")
    django.setup()
    from kitchen.models import Menu

    with open(CSV_PATH, newline='') as raw_data:
        csv_reader = csv.reader(raw_data)
        idx = 0
        for row in csv_reader:
            idx += 1
            if idx == 1:
                continue
            elif idx == 3316:
                break
            else:
                name = re.sub(' +', ' ', row[0])
                id = row[1]
                image_name = re.sub(' +','-', name)+"-"+id+".jpg"
                if os.path.exists(os.path.join(IMAGE_PATH,image_name)):
                    nutrition = row[6]
                    recipe = organize_recipe(row[8])
                    ingredient = organize_ingredient(row[10])
                    pattern = parse_nutrition(nutrition)
                    calories = float(pattern[0])
                    carbs = float(pattern[6])
                    protein = float(pattern[4])
                    fat = float(pattern[1])
                    menu = Menu.objects.create(
                        name = name,
                        calories = calories,
                        carbs = carbs,
                        protein = protein,
                        fat = fat,
                        image = settings.MEDIA_ROOT+image_name,
                        recipe = recipe,
                        ingredient = ingredient
                    )
                    menu.save()
                else:
                    print("no")
                    continue
                    print(calories, carbs, protein, fat)
