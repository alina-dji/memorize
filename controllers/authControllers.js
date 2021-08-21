const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

function signup_get (req, res) {
    res.render('signup.ejs');
}

function login_get (req,res) {
    res.render('login.ejs');
}

function handleErrors (err) {
    let errors = { name: '', email: '', password: '' };
    // signup errors
    if (err.code === 11000) {
        errors.email = 'This email is already registered';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        Object.values(err.errors).forEach(error => {
            errors[error.properties.path] = error.properties.message;
        });
    }
    // login errors
    if (err.message === 'incorrect email') {
        errors.email = 'This email is not registered';
    }
    if (err.message === 'incorrect password') {
        errors.password = 'This password is incorrect';
    }
    return errors;
}

const maxAge = 7*24*60*60; // in seconds

function createToken (id) {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: maxAge });
}

async function signup_post (req, res) {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({name, email, password});
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        res.status(200).json({user: user._id}); //201
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});    
    }
}

async function login_post (req,res) {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge*1000 });
        res.status(200).json({user});
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({errors});
    }
}

function logout_get (req, res) {
    res.cookie('jwt', '', {maxAge: 1});
    res.redirect('/');
}

module.exports = { signup_get, signup_post, login_get, login_post, logout_get };