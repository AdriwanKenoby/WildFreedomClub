'use strict'

const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

router.get('/login', (req, res, next) => {
	res.render('signin');
});

router.post('/login', passport.authenticate('local-signin',
{
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/logout', (req, res, next) => {
	req.logout();
	res.redirect('/');
});

router.get('/register', (req, res, next) => {
	res.render('signup')
});

router.post('/register', passport.authenticate('local-signup',
{
	successRedirect: '/',
	failureRedirect: '/register',
	failureFlash: true
}));

module.exports = router;
