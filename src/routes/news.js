const routes = require("express").Router();
const { getNews } = require("../controller/newsController");

routes.get("/", getNews);
module.exports = routes;
