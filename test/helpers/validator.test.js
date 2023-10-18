const expect = require("chai").expect;
const validator = require("../../src/helpers/validator");

const userDetails = {
  name: "test",
  email: "test@gmail.com",
  password: "123456",
};

describe("Validating the register user functionality", function () {
  it("Validates the payload successfully", function (done) {
    let response = validator.registerData(userDetails);
    expect(response.error).equal(false);
    expect(response.message).equal("Validation Successful");
    done();
  });

  it("Invalid name", function (done) {
    let userData = { ...userDetails };
    userData.name = "";
    let response = validator.registerData(userData);
    expect(response.error).equal(true);
    expect(response.message).equal("Name required and cannot be empty.");
    done();
  });

  it("Invalid email", function (done) {
    let userData = { ...userDetails };
    userData.email = "asdsadsads";
    let response = validator.registerData(userData);
    expect(response.error).equal(true);
    expect(response.message).equal("Email required and cannot be empty.");
    done();
  });

  it("Invalid Password", function (done) {
    let userData = { ...userDetails };
    userData.password = "";
    let response = validator.registerData(userData);
    expect(response.error).equal(true);
    expect(response.message).equal("Password required and cannot be empty.");
    done();
  });

  it("Additional property found", function (done) {
    let userData = { ...userDetails };
    userData.role = "admin";
    let response = validator.registerData(userData);
    expect(response.error).equal(true);
    expect(response.message).equal(
      "Invalid payload. Additional properties found."
    );
    done();
  });
});

const loginUserData = {
  email: "test@gmail.com",
  password: "123456",
};
describe("Validating the login user functionality", function () {
  it("Validates the payload successfully", function (done) {
    let response = validator.loginData(loginUserData);
    expect(response.error).equal(false);
    expect(response.message).equal("Validation Successful");
    done();
  });

  it("Invalid email", function (done) {
    let userData = { ...loginUserData };
    userData.email = "asdsadsads";
    let response = validator.loginData(userData);
    expect(response.error).equal(true);
    expect(response.message).equal("Email required and cannot be empty.");
    done();
  });

  it("Invalid Password", function (done) {
    let userData = { ...loginUserData };
    userData.password = "";
    let response = validator.loginData(userData);
    expect(response.error).equal(true);
    expect(response.message).equal("Password required and cannot be empty.");
    done();
  });

  it("Additional property found", function (done) {
    let userData = { ...loginUserData };
    userData.name = "admin";
    let response = validator.loginData(userData);
    expect(response.error).equal(true);
    expect(response.message).equal(
      "Invalid payload. Additional properties found."
    );
    done();
  });
});

const preferences = ["sports", "top"];
describe("Validating the preferences functionality", function () {
  it("Validates the preferences successfully", function (done) {
    let response = validator.validatePreferences(preferences);
    expect(response.error).equal(false);
    expect(response.message).equal("Preferences are valid.");
    expect(response.invalidPreferences).to.deep.equal([]);
    done();
  });

  it("Preferences is not array", function (done) {
    let data = "sports";
    let response = validator.validatePreferences(data);
    expect(response.error).equal(true);
    expect(response.message).equal("Preferences should be array of elements");
    expect(response).to.not.have.own.property("invalidPreferences");
    done();
  });

  it("Preferences is empty.", function (done) {
    let response = validator.validatePreferences([]);
    expect(response.error).equal(true);
    expect(response.message).equal("Please select atleast one preference");
    expect(response).to.not.have.own.property("invalidPreferences");
    done();
  });

  it("Invalid preference value.", function (done) {
    let data = ["sports", "top", "new"];
    let response = validator.validatePreferences(data);
    expect(response.error).equal(true);
    expect(response.message).equal("Invalid preferences found.");
    expect(response).to.have.own.property("invalidPreferences");
    expect(response.invalidPreferences).to.own.include("new");
    done();
  });
});

describe("Validating the article id functionality", function () {
  it("Validate the article id successfully", function (done) {
    let response = validator.isValidId("a04e54f3e3e4fe242489a02175044193");
    expect(response.error).equal(false);
    expect(response.message).equal("Valid article id");
    done();
  });

  const articleIds = [
    "",
    "a04e54-f3e3e4fe242-489a02175044193",
    "a04e54 f3e3e4fe242 489a02175044193",
  ];

  articleIds.forEach((id) => {
    it(`Invalid Article id - Id: ${id}`, (done) => {
      let response = validator.isValidId(id);
      expect(response.error).equal(true);
      expect(response.message).equal("Invalid article id");
      done();
    });
  });
});
