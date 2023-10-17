const { default: axios } = require("axios");
const URL = "https://newsdata.io/api/1/news";

const getNews = (req, res) => {
  let payload = {
    apiKey: process.env.API_SECRET,
    language: "en",
  };

  if (req.user.preferences) {
    payload.category = req.user.preferences.join(",");
  }

  const queryParams = new URLSearchParams(payload);
  axios
    .get(`${URL}?${queryParams}`)
    .then((resp) => {
      console.log("News API successfully called");
      return res.status(200).json({ error: false, data: resp.data.results });
    })
    .catch((err) => {
      console.log("News API error");
      return res.status(400).json({ error: false, message: err.message });
    });
};

module.exports = { getNews };
