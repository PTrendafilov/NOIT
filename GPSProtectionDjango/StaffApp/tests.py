from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth.models import User

class RegistrationTestCase(TestCase):
    def setUp(self):
        # Initialize the test client and set the URL for the tests.
        self.client = Client()
        self.url = reverse('StaffApp:registrate')

    def test_successful_registration(self):
        # Test successful registration scenario.
        response = self.client.post(self.url, {
            'name': 'John Doe',
            'email-register': 'john@example.com',
            'password-register': '12345'
        }, HTTP_X_REQUESTED_WITH='XMLHttpRequest')

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), {'success': True})
        self.assertTrue(User.objects.filter(email='john@example.com').exists())

    def test_duplicate_email_registration(self):
        # Test registration with a duplicate email.
        User.objects.create_user(username='john@example.com', email='john@example.com', password='12345')
        response = self.client.post(self.url, {
            'name': 'John Doe',
            'email-register': 'john@example.com',
            'password-register': '12345'
        }, HTTP_X_REQUESTED_WITH='XMLHttpRequest')

        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), {'success': False, 'error': 'Email already exists'})

    def test_invalid_request_method(self):
        # Test the behavior when using an invalid request method.
        response = self.client.get(self.url, HTTP_X_REQUESTED_WITH='XMLHttpRequest')
        self.assertEqual(response.status_code, 200)
        self.assertJSONEqual(str(response.content, encoding='utf8'), {'success': False, 'error': 'Invalid request method'})
