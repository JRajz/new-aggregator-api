const getNewsByPreference = (dbNews, userPreferences, keyword = false) => {
  const uniqueArticles = new Set(); // Create a Set to store unique users
  return dbNews.filter((news) => {
    const { title, description, category } = news;

    // checks if keyword present matches with new and title
    const isKeywordNews =
      !keyword ||
      (keyword &&
        ((title && title.includes(keyword)) ||
          (description && description.includes(keyword))));
    if (
      !uniqueArticles.has(news.article_id) &&
      isKeywordNews &&
      category.some((preference) => userPreferences.includes(preference))
    ) {
      // Add the articles ID to the Set to track uniqueness
      uniqueArticles.add(news.article_id);
      return true;
    }
    return false;
  });
};

module.exports = { getNewsByPreference };
