const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const shortid = require('shortid');



// const generateJwtToken = (_id, role) => {
//   return jwt.sign({ _id, role }, process.env.JWT_SECRET, {
//     expiresIn: "1d",
//   });
// };

exports.signup = async (req,res) => {

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ message: 'User already exists' });
        }
    
        const { firstName, lastName, email, password } = req.body;
        const hash_password = await bcrypt.hash(password, 10);
        const username = shortid.generate();
        const newUser = new User({ firstName, lastName, email, hash_password, username });
        const savedUser = await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Something went wrong' });
      }
}


exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isPassword = await user.authenticate(req.body.password);

    if (!isPassword || user.role !== 'user') {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const { _id, firstName, lastName, email, role, fullName } = user;

    res.status(200).json({
      token,
      user: {
        _id,
        firstName,
        lastName,
        email,
        role,
        fullName
      }
    });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
}






