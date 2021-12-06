import logmeal as api
from PIL import Image
import os

######
dirname = os.path.dirname
images_path = os.path.join(dirname(dirname(__file__)), 'images')
######

# user signup test

# userdict = api.signup(username="testuser"+"namkim111", api_company_token="2020202")
# print(userdict)

# image preprocess test
# api.preprocess(os.path.join(images_path, "brownie.jpeg"))

# menu recognition test

# api.menu_recognition(os.path.join(images_path, "brownie.jpeg"))
