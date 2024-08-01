// middleware used to protect routes

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel.js');

const protect = asyncHandler(async(req, res, next) => {
    let token;
    // this will be sent in headers in authorization object.
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token = req.headers.authorization.split(' ')[1];
            // get token
            const decoded = jwt.verify(token, process.end.JWT_SECRET);
            // verify token
            req.user = await User.findById(decoded.id);
            // get user from token since token has user id as payload
            // assign it to req.user so that we can use it in any route that's protected
        } catch(error) {

        }
    }
    // whenever token is sent, Bearer is in the prefix followed by token
});

module.exports = {protect};