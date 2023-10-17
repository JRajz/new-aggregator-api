const { default: axios } = require("axios");
const cron = require("node-cron");
const NewsModel = require("../models/newsModel");
const newsModel = new NewsModel(); // Create an instance
const URL = "https://newsdata.io/api/1/news";

// Function to fetch data from a URL
async function fetchData(url) {
  try {
    const response = await axios.get(url);
    console.log(`Fetched data from ${url}`);
    return response.data.results;
  } catch (error) {
    console.error(`Error fetching data from ${url}: ${error.message}`);
    throw new Error(`Error fetching data from ${url}`);
  }
}

async function fetchDataFromUrls(urls) {
  try {
    const results = [];

    for (const url of urls) {
      try {
        const response = await fetchData(url);
        results.push(response);

        // Add a delay of 2 seconds (2000 milliseconds) between API calls
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    const combinedResults = results.flatMap((array) => array);

    for (const news of combinedResults) {
      newsModel.insert(news);
    }

    await newsModel.writeToFile();
  } catch (error) {
    console.error("Error:", error);
  }
}

function fetchNews() {
  let urls = [];

  let payload = {
    apiKey: process.env.API_SECRET,
    language: "en",
  };

  const categories = [
    "business",
    "entertainment",
    "environment",
    "food",
    "health",
    "politics",
    "science",
    "sports",
    "technology",
    "top",
    "tourism",
    "world",
  ];

  for (const category of categories) {
    payload.category = category;
    const queryParams = new URLSearchParams(payload);
    urls.push(`${URL}?${queryParams}`);
  }

  // immediate api call
  fetchDataFromUrls(urls);

  // cron scheduled for 2 hours
  cron.schedule("*/120 * * * *", () => fetchDataFromUrls(urls));
}

module.exports = { fetchNews };
