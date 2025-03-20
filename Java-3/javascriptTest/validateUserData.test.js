const validateUserData = require('./validateUserData');

describe('validateUserData', () => {
    test('valid user data for Lorik should pass validation', () => {
        const userData = {
            username: "Lorik",
            email: "lorikzabergja@umib.net",
            password: "L0rik@123",
            age: 25,
            referralCode: "ABCDEF12"
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
    });

    test('valid user data for Erza14 should pass validation', () => {
        const userData = {
            username: "Erza14",
            email: "erzaademi@umib.net",
            password: "Erz@a14!",
            age: 22
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
    });

    test('valid user data for Erza31 should pass validation', () => {
        const userData = {
            username: "Erza31",
            email: "erza31@umib.net",
            password: "Erz@a31!",
            referralCode: "ABCDEFGH"
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(true);
        expect(result.errors).toEqual({});
    });

    test('Lorik with invalid email format should return an error', () => {
        const userData = {
            username: "Lorik",
            email: "lorikzabergja-umib.net", // Invalid email format
            password: "L0rik@123"
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(false);
        expect(result.errors.email).toBe("Invalid email format");
    });

    test('Erza14 with missing password should return an error', () => {
        const userData = {
            username: "Erza14",
            email: "erzaademi@umib.net"
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(false);
        expect(result.errors.password).toBe("Password is required");
    });

    test('Erza31 with short password should return an error', () => {
        const userData = {
            username: "Erza31",
            email: "erza31@umib.net",
            password: "Erz@31"
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(false);
        expect(result.errors.password).toBe("Password must be at least 8 characters long");
    });

    test('Lorik with referral code of incorrect length should return an error', () => {
        const userData = {
            username: "Lorik",
            email: "lorikzabergja@umib.net",
            password: "L0rik@123",
            referralCode: "ABCD"
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(false);
        expect(result.errors.referralCode).toBe("Referral code must be exactly 8 characters");
    });

    test('Erza14 with age below 18 should return an error', () => {
        const userData = {
            username: "Erza14",
            email: "erzaademi@umib.net",
            password: "Erz@a14!",
            age: 17
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(false);
        expect(result.errors.age).toBe("User must be at least 18 years old");
    });

    test('Erza31 with special characters in username should return an error', () => {
        const userData = {
            username: "Erza@31",
            email: "erza31@umib.net",
            password: "Erz@a31!"
        };

        const result = validateUserData(userData);
        expect(result.isValid).toBe(false);
        expect(result.errors.username).toBe("Username can only contain letters, numbers, and underscores");
    });

    test('Invalid data format (null input) should return global error', () => {
        const result = validateUserData(null);
        expect(result.isValid).toBe(false);
        expect(result.errors.global).toBe("Invalid user data format");
    });
});
