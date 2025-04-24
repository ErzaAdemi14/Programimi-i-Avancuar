const supabase = require('../utils/supabaseClient');  // Import Supabase client
const { hashPassword, comparePasswords } = require('../utils/passwordUtils');  // Utility functions for password hashing
const { validateUserInput } = require('../utils/validation');  // Validation utility

class UserService {
  // Register a new user
  static async registerUser(userData) {
    // Validate user input
    validateUserInput(userData);

    // Check if the email is already in use
    const { data, error } = await supabase
  .from('users')
  .select('email')
  .eq('email', userData.email);
    
    if (error) {
      throw new Error('Error checking email: ' + error.message);
    }

    // if (!data) {
    //   throw new Error('Email already in use');
    // }

    // Hash password
    const hashedPassword = await hashPassword(userData.password);

    // Create new user in Supabase
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert([{
        email: userData.email,
        password: hashedPassword,
        name: userData.name,
        last_login: new Date().toISOString()
      }])
      .select();

    if (insertError) {
      throw new Error('Error creating user: ' + insertError.message);
    }

    return newUser[0];  // Return the newly created user
  }

  // Login a user
  static async loginUser(email, password) {
    // Fetch user by email from Supabase
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error) {
      throw new Error('Error fetching user: ' + error.message);
    }

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare passwords
    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Update last login time
    const { error: updateError } = await supabase
      .from('users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', user.id);

    if (updateError) {
      throw new Error('Error updating last login: ' + updateError.message);
    }

    return user;
  }

  // Get user by ID
  static async getUserById(id) {
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Error fetching user: ' + error.message);
    }

    if (!user) {
      throw new Error('User not found');
    }

    return user;  // Return user data
  }

  // Update user data
  static async updateUser(id, updateData) {
    // If password is being updated, hash it
    if (updateData.password) {
      updateData.password = await hashPassword(updateData.password);
    }

    const { data: updatedUser, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select();

    if (error) {
      throw new Error('Error updating user: ' + error.message);
    }

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser[0];  // Return updated user data
  }
}

module.exports = UserService;
