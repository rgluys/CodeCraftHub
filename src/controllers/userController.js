const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

/**
 * Registers a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function registerUser(req, res) {
  try {
    const { username, password } = req.body;

    // Add logic to validate input

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = {
      username,
      password: hashedPassword,
    };
    const userId = await User.create(user);

    // Generate a JWT token
    const token = jwt.sign({ userId }, 'access-key');

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error registering user', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
}

/**
 * Logs in a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    // Add logic to validate input

    // Find the user in the database
    const user = await User.findByUsername(username);

    // Check if the password matches
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'access-key');

    // Return the token to the client
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user', error);
    res.status(500).json({ error: 'Failed to log in user' });
  }
}

module.exports = {
  registerUser,
  loginUser,
};