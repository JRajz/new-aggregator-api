process.env.NODE_ENV = "test";

let chai = require("chai");
const server = require("../../src/index");
let expect = require("chai").expect;
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("Verifies signup flow", () => {
  let signupBody = {
    name: "test",
    email: "test122@gmail.com",
    password: "12321321",
  };

  it("Successfull signup", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.error).equal(false);
        expect(res.body.message).equal("User registered successfully");
        done();
      });
  });

  it("Email duplication validation", (done) => {
    chai
      .request(server)
      .post("/register")
      .send(signupBody)
      .end((err, res) => {
        chai
          .request(server)
          .post("/register")
          .send(signupBody)
          .end((err, res) => {
            expect(res.status).equal(409);
            expect(res.body.error).equal(true);
            expect(res.body.message).equal("Email address already exists");
            done();
          });
      });
  });
});

describe("Verifies signin flow", () => {
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
        done();
      });
  });

  it("Successful Login", (done) => {
    let signInBody = {
      email: "test122@gmail.com",
      password: "12321321",
    };

    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.message).equal("Login Successful");
        expect(res.body).to.have.property("accessToken");
        done();
      });
  });

  it("Invalid Password", (done) => {
    let signInBody = {
      email: "test122@gmail.com",
      password: "123213211",
    };

    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(404);
        expect(res.body.error).equal(true);
        expect(res.body.message).equal("Invalid Password");
        expect(res.body.accessToken).to.be.undefined;
        done();
      });
  });

  it("User doesn't exist", (done) => {
    let signInBody = {
      email: "test1212@gmail.com",
      password: "12321321",
    };

    chai
      .request(server)
      .post("/login")
      .send(signInBody)
      .end((err, res) => {
        expect(res.status).equal(404);
        expect(res.body.error).equal(true);
        expect(res.body.message).equal("User not found");
        expect(res.body.accessToken).to.be.undefined;
        done();
      });
  });
});
