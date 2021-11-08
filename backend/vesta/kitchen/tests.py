from django.test import TestCase, Client

# Create your tests here.
class KitchenTestClass(TestCase):
    def test_record(self):
        client = Client()

        ## request from not signed in user should return 401
        response = client.get('/api/record/')
        self.assertEqual(response.status_code, 401)
