const { getNewsByPreference } = require('../helpers/filter');
const { isValidId, isValidKeyword } = require('../helpers/validator');
const NewsModel = require('../models/newsModel');
const UserModel = require('../models/userModel');

const newsModel = new NewsModel();
const userModel = new UserModel();

const getNews = (req, res) => {
  const userPreferences = req.user.preferences;

  const dbNews = newsModel.getAll();

  // retrieve user preference news
  const userNews = getNewsByPreference(dbNews, userPreferences);

  return res.status(200).json({
    error: false,
    data: userNews,
    message: userNews.length ? 'Data found' : 'No data found',
  });
};

const getReadNews = (req, res) => {
  const readArticles = req.user.readArticleIds;

  const articles = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const id of readArticles) {
    const article = newsModel.getById(id);
    if (article) {
      articles.push(article);
    }
  }

  return res.status(200).json({
    error: false,
    data: articles,
    message: articles.length ? 'Read articles found' : 'No articles read found',
  });
};

const setReadNews = async (req, res) => {
  const articleId = req.params.id || null;
  // validate preferences
  const isValidate = isValidId(articleId);
  if (isValidate.error) {
    return res.status(400).json(isValidate);
  }

  const article = newsModel.getById(articleId);
  if (!article) {
    return res.status(404).send({ error: true, message: 'Article not found' });
  }
  const userPreferences = req.user.preferences;
  if (
    !userPreferences.some((preference) => article.category.includes(preference))
  ) {
    return res.status(404).send({
      error: true,
      message: 'User does not has access to the article',
    });
  }

  try {
    const { readArticleIds } = req.user;

    const index = readArticleIds.indexOf(articleId);
    if (index === -1) {
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
      message: 'Article read updated',
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: true,
      message: 'Something went wrong while updating article read',
    });
  }
};

const getFavouriteNews = (req, res) => {
  const { favouriteArticleIds } = req.user;

  const articles = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const id of favouriteArticleIds) {
    const article = newsModel.getById(id);
    if (article) {
      articles.push(article);
    }
  }

  return res.status(200).json({
    error: false,
    data: articles,
    message: articles.length
      ? 'Favourite articles found'
      : 'No favourite articles found',
  });
};

const setFavouriteNews = async (req, res) => {
  const articleId = req.params.id || null;
  // validate preferences
  const isValidate = isValidId(articleId);
  if (isValidate.error) {
    return res.status(400).json(isValidate);
  }

  const isArticle = newsModel.getById(articleId);
  if (!isArticle) {
    return res.status(404).send({ error: true, message: 'Article not found' });
  }

  try {
    const { favouriteArticleIds } = req.user;

    const index = favouriteArticleIds.indexOf(articleId);
    if (index === -1) {
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
      message: 'Article favourite updated',
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      error: true,
      message: 'Something went wrong while updating artcile favourites',
    });
  }
};

const searchNews = async (req, res) => {
  const keyword = req.params.keyword || null;

  const isValidate = isValidKeyword(keyword);
  if (isValidate.error) {
    return res.status(400).json(isValidate);
  }

  const userPreferences = req.user.preferences;

  const dbNews = newsModel.getAll();

  // retrieve user preference news
  const userNews = getNewsByPreference(dbNews, userPreferences, keyword);

  return res.status(200).json({
    error: false,
    data: userNews,
    message: userNews.length ? 'News found' : 'No news found',
  });
};

module.exports = {
  getNews,
  getReadNews,
  setReadNews,
  getFavouriteNews,
  setFavouriteNews,
  searchNews,
};
