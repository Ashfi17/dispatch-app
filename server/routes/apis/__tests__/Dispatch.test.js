const request = require("supertest");
const app = require("../../../index");
const generateToken = require("../../../middleware/generateToken");

//since the api route expects token hence provifing a mock token for test
let token;
beforeAll((done) => {
  let userDetails = {
    user_id: "12",
    user_email: "Testcase@gmail.com",
    user_name: "test",
    user_password: "testspassword",
  };
  token = generateToken(userDetails);
  done();
});

describe("testing dispatch api", () => {
  it("should create a source, destination, and transporter details and return the message with statur code 200", async (done) => {
    let data = {
      source: "Allahabad",
      destination: "Kochi",
      transporter: "ABCXYZ",
    };
    let payload = JSON.stringify(data); //convert payload to json object
    await request(app)
      .post("/apis/dispatch/add-source-destination")
      .send(payload)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("added data successfully");
      });
    done();
  });
  it("should fetch all the details in dispatch table with status code 200", async (done) => {
    await request(app)
      .get("/apis/dispatch/dispatch-details")
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all details successfully"
        );
      });
    done();
  });
  it("should fetch all the details in in sorted manner and return status code of 200 with a message", async (done) => {
    let data = {
      order: "asc",
    };
    let payload = JSON.stringify(data);
    await request(app)
      .post("/apis/dispatch/sort-by-date")
      .send(payload)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Retrieved all details successfully"
        );
      });
    done();
  });
  it("should fetch all the rows as per the search query and return status code of 200 with a message", async (done) => {
    let data = {
      search: "s",
    };
    let payload = JSON.stringify(data);
    await request(app)
      .post("/apis/dispatch/search")
      .send(payload)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe(
          "Searched required result successfully"
        );
      });
    done();
  });
  it("should return status code of 400 with a message if nothing is found in search", async (done) => {
    let data = {
      search: "kl",
    };
    let payload = JSON.stringify(data);
    await request(app)
      .post("/apis/dispatch/search")
      .send(payload)
      .set("Content-type", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((response) => {
        expect(response.statusCode).toBe(404);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("No result found");
      });
    done();
  });
});
