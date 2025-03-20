import unittest
from validateUserData import validate_user_data

class TestValidateUserData(unittest.TestCase):
    def test_valid_data(self):
        user_data = {
            "username": "validUser123",
            "email": "user@example.com",
            "password": "StrongP@ss1",
            "age": 25,
            "referral_code": "ABCDEFGH"
        }
        result = validate_user_data(user_data)
        self.assertTrue(result["is_valid"])
        self.assertEqual(result["errors"], {})
    
    def test_missing_username(self):
        user_data = {
            "email": "user@example.com",
            "password": "StrongP@ss1"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("username", result["errors"])
    
    def test_invalid_username_length(self):
        user_data = {
            "username": "ab",
            "email": "user@example.com",
            "password": "StrongP@ss1"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertEqual(result["errors"]["username"], "Username must be between 3 and 20 characters")
    
    def test_invalid_username_characters(self):
        user_data = {
            "username": "invalid!user",
            "email": "user@example.com",
            "password": "StrongP@ss1"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("username", result["errors"])
    
    def test_invalid_email_format(self):
        user_data = {
            "username": "validUser",
            "email": "invalidemail",
            "password": "StrongP@ss1"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("email", result["errors"])
    
    def test_missing_password(self):
        user_data = {
            "username": "validUser",
            "email": "user@example.com"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("password", result["errors"])
    
    def test_short_password(self):
        user_data = {
            "username": "validUser",
            "email": "user@example.com",
            "password": "short1!"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("password", result["errors"])
    
    def test_password_without_number(self):
        user_data = {
            "username": "validUser",
            "email": "user@example.com",
            "password": "NoNumbers!"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("password", result["errors"])
    
    def test_password_without_special_character(self):
        user_data = {
            "username": "validUser",
            "email": "user@example.com",
            "password": "NoSpecial123"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("password", result["errors"])
    
    def test_underage_user(self):
        user_data = {
            "username": "validUser",
            "email": "user@example.com",
            "password": "StrongP@ss1",
            "age": 17
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("age", result["errors"])
    
    def test_invalid_age_type(self):
        user_data = {
            "username": "validUser",
            "email": "user@example.com",
            "password": "StrongP@ss1",
            "age": "twenty"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("age", result["errors"])
    
    def test_invalid_referral_code_length(self):
        user_data = {
            "username": "validUser",
            "email": "user@example.com",
            "password": "StrongP@ss1",
            "referral_code": "ABC"
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("referral_code", result["errors"])
    
    def test_invalid_referral_code_type(self):
        user_data = {
            "username": "validUser",
            "email": "user@example.com",
            "password": "StrongP@ss1",
            "referral_code": 12345678
        }
        result = validate_user_data(user_data)
        self.assertFalse(result["is_valid"])
        self.assertIn("referral_code", result["errors"])
    
    def test_invalid_data_type(self):
        result = validate_user_data("invalid string")
        self.assertFalse(result["is_valid"])
        self.assertIn("global", result["errors"])

if __name__ == "__main__":
    unittest.main()
