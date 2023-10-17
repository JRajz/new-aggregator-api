const getNewsByPreference = (dbNews, userPreferences) => {
  const uniqueArticles = new Set(); // Create a Set to store unique users
  return dbNews.filter((news) => {
    if (
      !uniqueArticles.has(news.article_id) &&
      news.category.some((preference) => userPreferences.includes(preference))
    ) {
      // Add the articles ID to the Set to track uniqueness
      uniqueArticles.add(news.article_id);
      return true;
    }
    return false;
  });
};

module.exports = { getNewsByPreference };
