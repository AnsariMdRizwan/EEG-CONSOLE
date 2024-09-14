const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

 const JWT_SECRET = process.env.JWT_SECRET || 'yourSecretKey';

// User registration
exports.registerUser = async (req, res) => {
  try {
    const { name ,email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ email, password, role });
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      message: 'User registered successfully',
      user: { email: newUser.email, role: newUser.role },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: 'Login successful',
      user: { email: user.email, role: user.role },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    // Assuming req.user has been populated by authentication middleware
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user profile:', error); // Log the full error on the server
    res.status(500).json({ message: 'Error fetching user profile' }); // Return a generic message
  }
};
