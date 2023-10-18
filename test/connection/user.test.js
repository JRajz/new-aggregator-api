const UserModel = require("../../src/models/userModel");
const userModel = new UserModel();

before((done) => {
  console.log("------ Testcases Start --------");
  done();
});

beforeEach((done) => {
  userModel.reset();
  done();
});

afterEach((done) => {
  userModel.reset();
  done();
});

after((done) => {
  console.log("------ Testcases End --------");
  userModel.reset();
  done();
});
