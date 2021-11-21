import csv
import django
import re
import os

# path needs to be changed
CSV_PATH = '/Users/youngsuh-hong/SWPP/Project/swpp2021-team5/database/RAW_recipes.csv'
IMAGE_PATH = '/Users/youngsuh-hong/SWPP/Project/swpp2021-team5/database/images/'

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
  from kitchen.models import *

  with open(CSV_PATH, newline='') as raw_data:
    csv_reader = csv.reader(raw_data)
    idx = 0
    for row in csv_reader:
      idx += 1
      if idx == 1:
        continue
      elif idx == 1001:
        break
      else:
        name = re.sub(' +', ' ', row[0])
        id = row[1]
        image_name = re.sub(' +','-', name)+"-"+id+".jpg"
        if os.path.exists(IMAGE_PATH+image_name):
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
            # image = 
            recipe = recipe,
            ingredient = ingredient
          )
          menu.save()
        else:
          continue
        # print(calories, carbs, protein, fat)