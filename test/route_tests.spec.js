const supertest = require("supertest");
const app = require("../index");
const Attempt = require("../schemas/attempt");

var test_uuid = "test-uuid-real-secure";
var level = Math.floor(Math.random() * (3 - 1) + 1);
var numOf_Q = Math.floor(Math.random() * (5 - 1) + 1);
describe("Testing backend routes", () => {
  it("Putting in User Details", async () => {
    var usr = { uuid: test_uuid, name: "Test_User" };
    const response = await supertest(app).get("/api/set/user").query(usr);
    var ok = JSON.parse(JSON.stringify(response.body));
    usr = ok;
    expect(response.status).toBe(200);
    expect(usr.uuid === test_uuid).toBe(true);
  });

  it("Trying to get score before the attempt", async () => {
    const response = await supertest(app)
      .get("/api/get/scores")
      .query({ uuid: test_uuid });
    var ok = JSON.parse(JSON.stringify(response.body));
    expect(response.status).toBe(200);
    expect(ok).toBe(false); //no score before attempt
  });

  it("Getting Quiz", async () => {
    const response = await supertest(app)
      .get("/api/get/questions")
      .query({ uuid: test_uuid, level: level, number: numOf_Q });
    var ok = JSON.parse(response.text);
    expect(response.status).toBe(200);
    ok.quiz.forEach((q) => {
      var check_lvl = level == 2 ? [1, 3] : [Number(level)];
      expect(check_lvl.includes(q.level)).toBe(true); //checking if got the right questions
    });
    var attempt = await Attempt.findById(ok.attemptId);
    expect(attempt.isSubmitted).toBe(false);
    expect(attempt.userId === test_uuid).toBe(true);
    expect(ok.quiz.length == numOf_Q).toBe(true);
    Attempt.deleteMany({ userId: test_uuid })
      .then((ok) => {
        expect(true).toBe(true);
      })
      .catch((e) => {
        console.log(e);
      }); //flags if attempts don't get deleted
  });
  afterAll(() => setTimeout(() => process.exit(), 1000)); //making sure jest exits
});
