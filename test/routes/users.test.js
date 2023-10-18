process.env.NODE_ENV = "test";

let chai = require("chai");
const server = require("../../src/index");
let expect = require("chai").expect;
let chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("Get User Profile", () => {
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

  it("Get profile successfull", (done) => {
    chai
      .request(server)
      .get("/profile")
      .set("authorization", accessToken)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.error).equal(false);
        expect(res.body).to.have.property("data");
        expect(res.body.data).to.have.property("name");
        expect(res.body.message).equal("User Profile");
        done();
      });
  });

  it("Invalid token", (done) => {
    chai
      .request(server)
      .get("/profile")
      .set("authorization", "asdsdasdssas")
      .end((err, res) => {
        expect(res.status).equal(403);
        expect(res.body.error).equal(true);
        expect(res.body.message).equal("Token verification failed");
        done();
      });
  });
});
