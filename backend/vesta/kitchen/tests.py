import datetime
import json
from django.test import TestCase, Client
from django.contrib.auth.models import User
from .models import Menu, Recipe, Record

# Create your tests here.
class kitchen_test_class(TestCase):
    ## test api/record/
    def test_record(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        ## GET TEST
        ## if client is not signed in, response to GET request should be 401
        response = client1.get('/api/record/')
        self.assertEqual(response.status_code, 401)
        
        ## if client is signed in, response to GET request should be 200 with correct content
        menu1 = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                                    fat=1, image='./images/brownie.jpeg')
        recipe1 = Recipe.objects.create(menu=menu1, recipe='recipe1')
        Record.objects.create(user=user, menu=menu1, recipe=recipe1,
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')
        response = client2.get('/api/record/')
        self.assertEqual(response.status_code, 200)
        self.assertIn('[{"id": 1, "user_id": 1, "menu_id": 1, "recipe_id": 1, "review": "review1", "liked": true, "date": "2021-11-01", "image": "./record_images/brownie.jpeg"}]',response.content.decode())


        ## POST TEST
        ## if client is not signed in, response to POST request should be 401
        response = client1.post('/api/record/')
        self.assertEqual(response.status_code, 401)

        ## if client is signed in, response to POST request should be 200 with correct content
        #response = client2.post('/api/record/', json.dumps({'menu_id': '1', 'recipe_id': '1', 'review': 'review1', 'liked': 'True', 'date': '2011-11-11', 'image': './record_images/brownie.jpeg'}),
         #                       content_type='application/json')
        #self.assertEqual(response.status_code, 200)

    ## test api/record/<int:record_id>/
    def test_record_id(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()

        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        menu1 = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                                    fat=1, image='./images/brownie.jpeg')
        recipe1 = Recipe.objects.create(menu=menu1, recipe='recipe1')
        Record.objects.create(user=user, menu=menu1, recipe=recipe1,
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')

        ## GET TEST
        ## if client is not signed in, response to GET request should be 401
        response = client1.get('/api/record/1/')
        self.assertEqual(response.status_code, 401)
        
        ## if matching record id does not exist, response should be 404
        response = client2.get('/api/record/2/')
        self.assertEqual(response.status_code, 404)

        ## correct response test
        response = client2.get('/api/record/1/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('', response.content.decode())

    def test_review(self):
        user = User.objects.create(username='testuser')
        user.set_password('testpassword')
        user.save()
        user2 = User.objects.create(username='testuser2')
        
        client1 = Client()
        client2 = Client()
        client2.login(username='testuser', password='testpassword')

        menu1 = Menu.objects.create(name='testmenu', calories=1, carbs=1, protein=1,
                                    fat=1, image='./images/brownie.jpeg')
        recipe1 = Recipe.objects.create(menu=menu1, recipe='recipe1')
        Record.objects.create(user=user, menu=menu1, recipe=recipe1,
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')
        Record.objects.create(user=user2, menu=menu1, recipe=recipe1,
                            review='review1', liked=True,
                            date=datetime.date(2021,11,1),
                            image='./record_images/brownie.jpeg')

        ## NOT GET, POST, PUT, DELETE TEST
        response = client1.patch('/api/record/1/review/')
        self.assertEqual(response.status_code, 405)

        ## GET TEST
        response = client2.get('/api/record/1/review/')
        self.assertEqual('{"review": "review1"}', response.content.decode())

        ## POST TEST
        response = client1.post('/api/record/1/review/')
        self.assertEqual(response.status_code, 401)
        
        response = client2.post('/api/record/100/review/')
        self.assertEqual(response.status_code, 404)
        
        response = client2.post('/api/record/2/review/')
        self.assertEqual(response.status_code, 403)
        
        response = client2.post('/api/record/1/review/', {'review': 'newReview'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "user_id": 1, "menu_id": 1, "recipe_id": 1, "review": "newReview", "liked": true, "date": "2021-11-01"}', response.content.decode())

        ## PUT TEST
        response = client2.put('/api/record/1/review/', {'review': 'editReview'}, content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "user_id": 1, "menu_id": 1, "recipe_id": 1, "review": "editReview", "liked": true, "date": "2021-11-01"}', response.content.decode())

        ## DELETE TEST
        response = client2.delete('/api/record/1/review/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual('{"id": 1, "user_id": 1, "menu_id": 1, "recipe_id": 1, "review": "", "liked": true, "date": "2021-11-01"}', response.content.decode())