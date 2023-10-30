const routes = require('express').Router();
const { profile } = require('../controller/userController');

routes.get('/profile', profile);

module.exports = routes;
