'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
	res.render('chat', { username: req.user.username });
});

module.exports = router;
