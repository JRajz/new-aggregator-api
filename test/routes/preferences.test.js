process.env.NODE_ENV = "test";

let chai = require("chai");
const server = require("../../src/index");
let expect = require("chai").expect;
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("Get User Preferences", () => {
  let accessToken;

  beforeEach((done) => {
    let signupBody = {
      name: "test",
      email: "test122@gmail.com",
      password: "12321321",
    };

    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        chai
          .request(server)
          .post("/login")
          .send({
            email: "test122@gmail.com",
            password: "12321321",
          })
          .end((err, res) => {
            accessToken = res.body.accessToken;
            done();
          });
      });
  });

  it("Validates token and get user preferences", (done) => {
    chai
      .request(server)
      .get("/preferences")
      .set("authorization", accessToken)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.error).equal(false);
        expect(res.body.message).equal("User Preferences");
        done();
      });
  });
});

describe("Update User Preferences", () => {
  let accessToken;

  beforeEach((done) => {
    let signupBody = {
      name: "test",
      email: "test122@gmail.com",
      password: "12321321",
    };

    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        chai
          .request(server)
          .post("/login")
          .send({
            email: "test122@gmail.com",
            password: "12321321",
          })
          .end((err, res) => {
            accessToken = res.body.accessToken;
            done();
          });
      });
  });

  let payloadBody = { preferences: ["sports", "top"] };

  it("Update User preferences", (done) => {
    chai
      .request(server)
      .put("/preferences")
      .send(payloadBody)
      .set("authorization", accessToken)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.error).equal(false);
        expect(res.body.message).equal("User preferences updated successfully");
        done();
      });
  });

  it("Invalid preferences entered", (done) => {
    payloadBody.preferences.push("new");
    chai
      .request(server)
      .put("/preferences")
      .send(payloadBody)
      .set("authorization", accessToken)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal(true);
        expect(res.body.message).equal("Invalid preferences found.");
        expect(res.body).to.have.own.property("invalidPreferences");
        done();
      });
  });

  it("Empty Preferences entered", (done) => {
    payloadBody.preferences = [];
    chai
      .request(server)
      .put("/preferences")
      .send(payloadBody)
      .set("authorization", accessToken)
      .end((err, res) => {
        expect(res.status).equal(400);
        expect(res.body.error).equal(true);
        expect(res.body.message).equal("Please select atleast one preference");
        done();
      });
  });
});
