const fs = require("fs").promises;
const path = require("path");
const { writeFile } = require("../helpers/fileOperations");
const { throws } = require("assert");
const filePath = path.join(__dirname, "..", `data/news.json`);

class News {
  constructor({ article_id, title, link, category, image_url, description }) {
    this.article_id = article_id;
    this.title = title;
    this.link = link;
    this.category = category;
    this.image_url = image_url;
    this.description = description;
  }
}

class NewsModel {
  constructor() {
    if (NewsModel.instance) {
      return NewsModel.instance;
    }

    this.filePath = filePath;
    this.newsMap = new Map();
    this.loadData();
    NewsModel.instance = this;
  }

  /**
   * Initiate the model
   * Loading json file if present
   */
  async loadData() {
    try {
      const data = await fs.readFile(filePath, "utf8");
      console.log(" ---------- News json loaded successfully ----------");
      if (data) {
        const newsData = JSON.parse(data);
        this.setMap(newsData);
      }
    } catch (err) {
      console.log("News.json not exists");
    }
  }

  // Populate the Map with news data
  setMap(parsedData) {
    for (const news of parsedData) {
      this.newsMap.set(news.article_id, news);
    }
  }

  /**
   * returns all users
   * @returns array
   */
  getAll() {
    console.log("Get all news");
    return [...this.newsMap.values()];
  }

  /**
   * returns news by id
   * @returns Obj
   */
  getById(articleId) {
    if (this.newsMap.has(articleId)) {
      return this.newsMap.get(articleId);
    } else {
      // News with the provided ID does not exist
      return null;
    }
  }

  /**
   * insert new news data
   * @returns array
   */
  insert(newsData) {
    const data = new News(newsData);

    try {
      // checking news exist
      if (!this.newsMap.has(data.article_id)) {
        this.newsMap.set(data.article_id, data);
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(`Newsmapping Error`);
    }
  }

  /**
   * updating new json file
   * @returns Boolean
   */
  async writeToFile() {
    try {
      console.log("Update news");

      const newsData = this.getAll();

      if (newsData.length) {
        await writeFile(newsData, "news");
      }

      return true;
    } catch (error) {
      console.log(error);
      throw new Error(`Failed to write news`);
    }
  }
}

module.exports = NewsModel;
