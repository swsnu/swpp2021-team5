import csv
import re
import urllib.request
# from urllib import request
# from urllib.request import urlopen
# from bs4 import BeautifulSoup
import selenium
from selenium import webdriver

def get_image_(url, image_name):
  options = webdriver.ChromeOptions()
  options.add_argument('headless')
  driver = webdriver.Chrome('/Users/youngsuh-hong/SWPP/Project/swpp2021-team5/chromedriver')
  driver.get(url=url)
  element = driver.find_element_by_xpath('//*[@id="__layout"]/div/div[2]/div/div/div[7]/div/div/div[1]/div/div/img')
  print(element)
  image = element.get_attribute("src")
  print(image)
  urllib.request.urlretrieve(image, image_name+".jpg")


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
        image_name = name+"-"+id
        get_image_(url, image_name=image_name)
