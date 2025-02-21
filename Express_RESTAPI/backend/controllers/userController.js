const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

// register new user
// POST /api/users
// access public
const registerUser = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password)
    {
        res.status(400);
        throw new Error('Please enter all fields!');
    }

    const userExists = await User.findOne({email});

    if(userExists) {
        res.status(400);
        throw new Error('User already exists!');
    }

    const salt = await bcrypt.genSalt(10); // hash password
    const hashedPassword = await bcrypt.hash(password, salt);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data!');
    }
});

// authenticate a user
// POST /api/users/login
// access public
const loginUser = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid credentials!');
    }
});

// get user data
// GET /api/users/me
// access private
const getMe = asyncHandler(async(req, res) => {

});

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};