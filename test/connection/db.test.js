const UserModel = require("../../src/models/userModel");
const User = new UserModel();
const NewsModel = require("../../src/models/newsModel");
const News = new NewsModel();

before((done) => {
  console.log("------ Testcases Start --------");
  done();
});

beforeEach((done) => {
  User.reset(); // reset user data
  News.reset(); // reset news data
  done();
});

afterEach((done) => {
  User.reset();
  News.reset();
  done();
});

after((done) => {
  console.log("------ Testcases End --------");
  done();
});
