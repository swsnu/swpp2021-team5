import csv
import re
import urllib
from urllib.request import urlopen
from bs4 import BeautifulSoup

def get_image_(url):
  # context = ssl._create_unverified_context()
  html_text = urlopen(url)
  bs = BeautifulSoup(html_text, 'html.parser')  # BeautifulSoup variable
  bs.find_all("img", class_="recipe-image__img")
  print(bs)
  # div = list(bs.find())


if __name__ == "__main__":
  with open("/Users/youngsuh-hong/SWPP/Project/swpp2021-team5/database/RAW_recipes.csv", newline='') as raw_data:
    csv_reader = csv.reader(raw_data)
    idx = 0
    for row in csv_reader:
      idx+=1
      if idx == 1:
        continue
      elif idx == 3:   # collect 10,000 menus
        break
      else:
        name = row[0]
        id = row[1]
        name = re.sub(' +','-', name)
        url = "https://www.food.com/recipe/"+name+"-"+id
        print(url)
        get_image_(url)
