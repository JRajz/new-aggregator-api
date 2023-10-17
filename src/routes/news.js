const routes = require("express").Router();
const {
  getNews,
  getFavouriteNews,
  getReadNews,
  setFavouriteNews,
  setReadNews,
} = require("../controller/newsController");

routes.get("/", getNews);
routes.get("/read", getReadNews);
routes.post("/:id/read", setReadNews);
routes.get("/favorite", getFavouriteNews);
routes.post("/:id/favorite", setFavouriteNews);
module.exports = routes;
