const express = require('express');
const routes = require('express').Router();
const { signup, login } = require('../controller/authController');

routes.get('/', (req, res) => {
  res.status(200).send('<h2>Welcome to News Aggregator API</h2>');
});

routes.post('/register', signup);

routes.post('/login', login);

module.exports = routes;
