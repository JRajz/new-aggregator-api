const express = require("express");
const routes = require("express").Router();

const { fetchNews } = require("./service/newsService");
// Require your routes and verifyToken middleware
const publicRoutes = require("./routes/public");
const usersRoutes = require("./routes/users");
const preferencesRoutes = require("./routes/preferences");
const newsRoutes = require("./routes/news");
const verifyToken = require("./middlewares/authJWT"); // Import the verifyToken middleware

require("dotenv").config();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Apply the verifyToken middleware to specific routes
app.use("/", publicRoutes);

app.use(verifyToken); // Applies to the following routes

app.use("/", usersRoutes);
app.use("/preferences", preferencesRoutes);
app.use("/news", newsRoutes);

// Invalid routes
app.use("*", (req, res) => {
  return res.status(404).send("<h2>Routes not found</h2>");
});

// initialze the server
app.listen(port, (err) => {
  if (err) {
    console.log("Someting went wrong.");
  } else {
    console.log(`Server running successfully running at : ${port}.`);
    // cron service to fetch new API
    if (process.env.NODE_ENV !== "test") {
      fetchNews();
    }
  }
});

module.exports = app;
