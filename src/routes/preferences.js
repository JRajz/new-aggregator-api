const routes = require('express').Router();
const {
  getUserPreferences,
  updateUserPreferences,
} = require('../controller/preferenceController');

routes.get('/', getUserPreferences);

routes.put('/', updateUserPreferences);

module.exports = routes;
