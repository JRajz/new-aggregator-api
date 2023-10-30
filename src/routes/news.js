const routes = require("express").Router();
const {
  getNews,
  getFavouriteNews,
  getReadNews,
  setFavouriteNews,
  setReadNews,
  searchNews,
} = require("../controller/newsController");

// get user preference news
routes.get("/", getNews);

// get user readed news
routes.get("/read", getReadNews);

// mark news as read
routes.post("/:id/read", setReadNews);

// get user favourite news
routes.get("/favorite", getFavouriteNews);

// mark news as favorite
routes.post("/:id/favorite", setFavouriteNews);

// search articles in user preference news
routes.get("/search/:keyword", searchNews);

module.exports = routes;
