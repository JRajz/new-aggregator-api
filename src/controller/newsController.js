const { getNewsByPreference } = require("../helpers/filter");
const { isValidId } = require("../helpers/validator");
const NewsModel = require("../models/newsModel");
const UserModel = require("../models/userModel");
const newsModel = new NewsModel();
const userModel = new UserModel();

const getNews = (req, res) => {
  const userPreferences = req.user.preferences;

  const dbNews = newsModel.getAll();

  // retrieve user preference news
  const userNews = getNewsByPreference(dbNews, userPreferences);
  if (userNews) {
    return res.status(200).json({ error: false, data: userNews });
  } else {
    return res.status(400).json({ error: false, message: "No data found" });
  }
};

const getReadNews = (req, res) => {
  const readArticles = req.user.readArticleIds;

  const articles = [];
  let article;
  for (const id of readArticles) {
    const article = newsModel.getById(id);
    if (article) {
      articles.push(article);
    }
  }

  if (articles.length) {
    return res.status(200).json({
      error: false,
      data: articles,
      message: "Read articles found",
    });
  } else {
    return res.status(400).json({
      error: false,
      message: "No articles read found",
    });
  }
};

const setReadNews = async (req, res) => {
  const articleId = req.params.id;
  // validate preferences
  const isValidate = isValidId(articleId);
  if (isValidate.error) {
    return res.status(400).json(isValidate);
  }

  const article = newsModel.getById(articleId);
  if (!article) {
    return res.status(404).send({ error: true, message: "Article not found" });
  }
  const userPreferences = req.user.preferences;
  if (
    !userPreferences.some((preference) => article.category.includes(preference))
  ) {
    return res.status(404).send({
      error: true,
      message: "User does not has access to the article",
    });
  }

  try {
    let readArticleIds = req.user.readArticleIds;

    const index = readArticleIds.indexOf(articleId);
    if (index == -1) {
      readArticleIds.push(articleId);
    } else {
      readArticleIds.splice(index, 1);
    }

    const userData = {
      id: req.user.id,
      readArticleIds,
    };

    await userModel.update(userData);

    return res.status(200).send({
      error: false,
      message: "Article read updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: true,
      message: "Something went wrong while updating article read",
    });
  }
};

const getFavouriteNews = (req, res) => {
  const favouriteArticleIds = req.user.favouriteArticleIds;

  const articles = [];
  let article;
  for (const id of favouriteArticleIds) {
    const article = newsModel.getById(id);
    if (article) {
      articles.push(article);
    }
  }

  if (articles.length) {
    return res.status(200).json({
      error: false,
      data: articles,
      message: "Favourite articles found",
    });
  } else {
    return res.status(400).json({
      error: false,
      message: "No favourite articles found",
    });
  }
};

const setFavouriteNews = async (req, res) => {
  const articleId = req.params.id;
  // validate preferences
  const isValidate = isValidId(articleId);
  if (isValidate.error) {
    return res.status(400).json(isValidate);
  }

  const isArticle = newsModel.getById(articleId);
  if (!isArticle) {
    return res.status(404).send({ error: true, message: "Article not found" });
  }

  try {
    let favouriteArticleIds = req.user.favouriteArticleIds;

    const index = favouriteArticleIds.indexOf(articleId);
    if (index == -1) {
      favouriteArticleIds.push(articleId);
    } else {
      favouriteArticleIds.splice(index, 1);
    }

    const userData = {
      id: req.user.id,
      favouriteArticleIds,
    };

    await userModel.update(userData);

    return res.status(200).send({
      error: false,
      message: "Article favourite updated",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: true,
      message: "Something went wrong while updating artcile favourites",
    });
  }
};

module.exports = {
  getNews,
  getReadNews,
  setReadNews,
  getFavouriteNews,
  setFavouriteNews,
};
