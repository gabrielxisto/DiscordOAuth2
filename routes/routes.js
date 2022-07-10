const express = require("express");
const router = express.Router();

const login = require('./auth/login');
const loginCallback = require('./auth/loginCallback');
const logout = require('./auth/logout');


router.get('/login/',login)
router.get('/login/callback',loginCallback)
router.get('/logout/',logout)

module.exports = router