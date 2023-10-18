process.env.NODE_ENV = "test";

let chai = require("chai");
const server = require("../../src/index");
let expect = require("chai").expect;
let chaiHttp = require("chai-http");
chai.use(chaiHttp);
const NewsModel = require("../../src/models/newsModel");
const News = new NewsModel();

describe("Get User Accessible News", () => {
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

    const news = {
      article_id: "e006a99e8f031e0716dcf4189dc0a1ba",
      title:
        "The Most Trusted VPN in the United States Is Now the Cheapest We Have Seen at Just $2.69 Per Month",
      link: "https://theinventory.com/our-readers-favorite-vpn-is-just-3-per-month-here-only-1849041429",
      category: ["top"],
      image_url:
        "https://i.kinja-img.com/image/upload/c_fit,fl_progressive,q_80,w_636/58caf9e13dca49e61467862e64b5e3bd.png",
      description:
        "Commerce Content is independent of Editorial and Advertising, and if you buy something through our posts, we may get a small share of the sale. Click here for more.With more and more of our lives existing online, we’re sharing and accessing more and more private data. My daily screen time average was 8 hours last week and I’m also lying. It was much worse. Point is, that’s a lot of data that I don’t necessarily want just any company to be able to track all willy-nilly. In order…Read more...",
    };

    News.insert(news);
  });

  it("Get user Preference news", (done) => {
    chai
      .request(server)
      .get("/news")
      .set("authorization", accessToken)
      .end((err, res) => {
        expect(res.status).equal(200);
        expect(res.body.error).equal(false);
        expect(res.body).to.have.own.property("data");
        expect(res.body.message).equal("Data found");
        done();
      });
  });

  it("User Preference news not found", (done) => {
    let payloadBody = { preferences: ["sports"] };

    chai
      .request(server)
      .put("/preferences")
      .send(payloadBody)
      .set("authorization", accessToken)
      .end((err, res) => {
        chai
          .request(server)
          .get("/news")
          .set("authorization", accessToken)
          .end((err, res) => {
            expect(res.status).equal(200);
            expect(res.body.error).equal(false);
            expect(res.body).to.have.own.property("data");
            expect(res.body.data).to.deep.equal([]);
            expect(res.body.message).equal("No data found");
            done();
          });
      });
  });
});

// Write Testcases for read and favourite news

// User Read news
// User Favourite news
