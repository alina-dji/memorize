const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

// the user has to be logged in if he wants to access the workspace
function ifLoggedin (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.redirect('/login');
            }
            else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    }
    else {
        res.redirect('/login');
    }
}

// the user has to be logged out if he wants to access other pages (home, signup, login, ...)
function ifLoggedout (req, res, next) {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                next();
            }
            else {
                let user = await User.findById(decodedToken.id);
                let path = '/workspace/' + user._id + '/' + user.pages[0]._id;
                res.redirect(path);
            }
        });
    }
    else {
        next();
    }
}

module.exports =  { ifLoggedin, ifLoggedout };