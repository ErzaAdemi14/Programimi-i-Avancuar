// In-memory database
let users = [];
let idCounter = 1;

class User {
  constructor({ email, password, name, address }) {
    this.id = (idCounter++).toString();
    this.email = email;
    this.password = password; // This will be hashed
    this.name = name;
    this.address = address || {};
    this.registrationDate = new Date().toISOString();
    this.lastLogin = null;
  }

  // Remove password before sending user data
  toJSON() {
    const { password, ...user } = this;
    return user;
  }

  static create(userData) {
    const newUser = new User(userData);
    users.push(newUser);
    return newUser;
  }

  static findByEmail(email) {
    return users.find(user => user.email === email);
  }

  static findById(id) {
    return users.find(user => user.id === id);
  }

  static update(id, updateData) {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;
    
    // Preserve password if not being updated
    if (!updateData.password) {
      updateData.password = users[userIndex].password;
    }
    
    users[userIndex] = { ...users[userIndex], ...updateData };
    return users[userIndex];
  }

  static deleteAll() {
    // For testing purposes
    users = [];
    idCounter = 1;
  }
}

module.exports = User;