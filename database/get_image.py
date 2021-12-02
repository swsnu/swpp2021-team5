import csv
import re
import urllib.request
# from urllib import request
# from urllib.request import urlopen
# from bs4 import BeautifulSoup
import selenium
from selenium import webdriver
from datetime import datetime
from time import sleep
from selenium.common.exceptions import NoSuchElementException, WebDriverException

def get_image_(url, image_name):
  options = webdriver.ChromeOptions()
  options.add_argument('headless')
  driver = webdriver.Chrome(executable_path='/Users/youngsuh-hong/SWPP/Project/swpp2021-team5/chromedriver', options=options)
  driver.get(url=url)
  sleep(5)
  try:
    element = driver.find_element_by_xpath('//*[@id="__layout"]/div/div[2]/div/div/div[7]/div/div/div[1]/div/div/img')
  except NoSuchElementException:
    return
  except WebDriverException:
    return
  except Exception:
    return
  # element = driver.find_element_by_xpath('//*[@id="__layout"]/div/div[2]/div/div/div[7]/div/div/div[1]/div/div/img')
  # print(element)
  image = element.get_attribute("src")
  # print(image)
  urllib.request.urlretrieve(image, image_name+".jpg")


if __name__ == "__main__":
  with open("/Users/youngsuh-hong/Downloads/RAW_recipes 2.csv", newline='') as raw_data:
    csv_reader = csv.reader(raw_data)
    idx = 0
    start = datetime.now()
    print(start)
    for row in csv_reader:
      idx+=1
      if idx < 3316:
        continue
      elif idx == 10001:   # collect 2000 menus
        end = datetime.now()
        diff = end - start
        print('diff: ', diff)
        break
      else:
        name = row[0]
        id = row[1]
        name = re.sub(' +','-', name)
        url = "https://www.food.com/recipe/"+name+"-"+id
        image_name = name+"-"+id
        get_image_(url, image_name=image_name)
        print(idx)
