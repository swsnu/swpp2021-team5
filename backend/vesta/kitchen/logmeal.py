import base64
import os
import requests
from PIL import Image
from io import BytesIO, StringIO

#################
# configuration
api_company_token = '08c17275a67ca0d8c1fc40f4ec776884d10a41dd'
available_company_tokens = [
    '08c17275a67ca0d8c1fc40f4ec776884d10a41dd',
    '46cf3c97d0e55fc9c959f92d5de39babbb5f1d08',
    '195ab2bb681393befe2be38cba010c7a925728c7',
    'c3f7853b6adbfd3b84f9fb93bf4a8a8e6e847c75',
    '96757cd38e4c64d23729d2975460c9a504572def',
    '77ed7fdbb3c84d457ba350585af0c2b0d52b579c',
]
api_user_token = '0ce3203ec3f4906581d6ee835e08eafb4e10264e'
api_url = 'https://api.logmeal.es/v2/'
dirname = os.path.dirname
images_path = os.path.join(dirname(dirname(__file__)), 'images')
#
#################

def signup(username, api_company_token=api_company_token):
    # Set the API Company Token in the header of the request
    url = 'https://api.logmeal.es/v2/users/signUp'

    # Create an API User with the default languange ('eng')
    for company_api in available_company_tokens:
        headers = {'Authorization': 'Bearer ' + company_api}
        response = requests.post(url,
                                json={'username': str(username)},
                                headers=headers)
        # Get the API User Token from the response
        response_dict = dict(response.json())
        if 'token' in response_dict.keys():
            return response_dict

    return response_dict

def resign(userID, api_company_token=api_company_token):
    headers = {'Authorization': 'Bearer ' + api_company_token}
    url = 'https://api.logmeal.es/v2/users/deleteAPIUser/'

    # Create an API User with the default languange ('eng')
    response = requests.delete(url+str(userID),
                            headers=headers)
    # Get the API User Token from the response
    response_dict = dict(response.json())

    return response_dict

def getUsers(api_company_token=api_company_token):
    # Set the API Company Token in the header of the request
    headers = {'Authorization': 'Bearer ' + api_company_token}

    # Get all your API Users
    response = requests.post(api_url+'users/APIUsers', headers=headers)

    # Get the API User Token from the response
    APIUsers_list = response.json()

    # Get the Id, Token, language and username of the first API User:
    # APIUsers_list[0]["id"]
    # APIUsers_list[0]["token"]
    # APIUsers_list[0]["language"]
    # APIUsers_list[0]["user"]

    return APIUsers_list

def preprocess(img_path):
    # open the original image and convert it to 'RGB' type
    path_original_image = img_path
    global_path = os.path.dirname(img_path)
    im = Image.open(path_original_image)
    # im.show()

    # [IMPORTANT to keep image orientation] get exif information
    # exif_dict = piexif.load(im._getexif())
    # exif_bytes = piexif.dump(exif_dict)
    rgb_im = im.convert('RGB')

    # get the width and the height
    width, height = rgb_im.size

    # get the name of the image
    image_name = os.path.basename(path_original_image)

    # get the name without the extension
    image_name_noext = os.path.splitext(image_name)[0]

    # create the path where the new images will be saved as '.JPG'
    path = os.path.join(global_path, image_name_noext + '.jpg')

    size_mb = os.path.getsize(img_path) >> 20
    width, height = rgb_im.size

    # iteratively reduce the image a percentatge of its size until it is smaller than 1MB
    rez_image = rgb_im

    while size_mb >= 1:
        # resize th image 75%
        size=int(width*0.75), int(height*0.75)
        rez_image = rgb_im.resize(size, Image.ANTIALIAS)

        # get the size in MB
        size_mb = os.path.getsize(path) >> 20
        width, height = size

    # save the resized image
    rez_image.save(path)
    
    return path


def menu_recognition(img_path, user_token=api_user_token):
    img = img_path
    api_user_token = user_token
    headers = {'Authorization': 'Bearer ' + api_user_token}

    # Single Dishes Detection
    url = api_url + 'recognition/complete'
    # resp = requests.post(url,files={'image': open(img, 'rb')}, headers=headers)
    # img_open = open('upload_img.jpg','w')
    # img_open.write(base64.decodestring(img))
    img_open = Image.open(BytesIO(base64.b64decode(img)))
    img_open = img_open.convert('RGB')
    img_open.save('uploaded_img.jpg')

    result_dict = {}


    resp = requests.post(url,files={'image':open('uploaded_img.jpg', 'rb')}, headers=headers)
    print(resp.json())
    print(resp.json()["recognition_results"]) # display dish only

    result_dict["recognition_results"] = resp.json()["recognition_results"]
    result_dict["imageId"] = resp.json()["imageId"]

    url = api_url + 'recipe/nutritionalInfo'

    resp = requests.post(url,json={'imageId': result_dict['imageId']}, headers=headers)
    print(resp.json()) # display nutritional info

    result_dict["nutritional_info"] = resp.json()["nutritional_info"]

    url = api_url + 'recipe/ingredients'
    resp = requests.post(url,json={'imageId': result_dict['imageId']}, headers=headers)
    print(resp.json()) # display ingredients info

    result_dict["ingredients"] = resp.json()["recipe"]



    
    return result_dict
