const { client } = require('../config/db');

const db = client.db();

const userCollection = db.collection('users');

class User {
  static async create(user) {
    try {
      const result = await userCollection.insertOne(user);
      return result.insertedId;
    } catch (error) {
      console.error('Error creating user', error);
      throw new Error('Failed to create user');
    }
  }

  static async findByUsername(username) {
    try {
      const user = await userCollection.findOne({ username });
      return user;
    } catch (error) {
      console.error('Error finding user', error);
      throw new Error('Failed to find user');
    }
  }

  // Add other methods for updating, deleting, and querying users
}

module.exports = User;