// const { Router } = require('express');
// const router = Router();
const express = require('express');
const router = express.Router();

const authControllers = require('../controllers/authControllers');
const authMiddleware = require('../middleware/authMiddleware');

router.get('/signup', authMiddleware.ifLoggedout, authControllers.signup_get);
router.post('/signup', authControllers.signup_post);
router.get('/login', authMiddleware.ifLoggedout, authControllers.login_get);
router.post('/login', authControllers.login_post);
router.get('/logout', authControllers.logout_get);

module.exports = router;