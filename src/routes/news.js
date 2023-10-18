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
// get user read news
routes.get("/read", getReadNews);
// mark news read
routes.post("/:id/read", setReadNews);
// see user favourites news
routes.get("/favorite", getFavouriteNews);
// mark news favorite
routes.post("/:id/favorite", setFavouriteNews);
// serach user preference news
routes.get("/search/:keyword", searchNews);

module.exports = routes;
