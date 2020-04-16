const request = require("supertest");
const app = require("../../../index");

let id = "";
describe("testing user apis", () => {
  //create new user
  it("should return a status code of 200 and a message while creating a new user", async (done) => {
    let data = {
      user_name: "apitest",
      user_email: "Testcase@gmail.com",
      user_password: "testspassword",
      user_address: "test address",
    };
    let payload = JSON.stringify(data); //convert payload to json object
    await request(app)
      .post("/apis/users/new")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response) => {
        //storing the id , that will be used later for deleting
        id = response.body.data[0].user_id;
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("user created successfully");
      });
    done();
  });
  //throw conflict error if the same email exists
  it("should return a status code of 409 and a message while creating a new user", async (done) => {
    let data = {
      user_name: "apitest",
      user_email: "Testcase@gmail.com",
      user_password: "testspassword",
      user_address: "test address",
    };
    let payload = JSON.stringify(data); //convert payload to json object
    await request(app)
      .post("/apis/users/new")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(409);
        expect(response.body.message).toBe("email already exists");
      });
    done();
  });
  //should throw an error message if the login email is incorrect
  it("should return a status code of 400 and a message while login ", async (done) => {
    let data = {
      user_email: "estcase@gmail.com", //wrong email
      user_password: "testspassword",
    };
    let payload = JSON.stringify(data); //convert payload to json object
    await request(app)
      .post("/apis/users/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Email address invalid");
      });
    done();
  });
  //should successfully login a user if the  credentials are correct
  it("should return a status code of 200 and a message while login ", async (done) => {
    let data = {
      user_email: "Testcase@gmail.com", //correct email
      user_password: "testspassword",
    };
    let payload = JSON.stringify(data); //convert payload to json object
    await request(app)
      .post("/apis/users/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Logged in successful");
      });
    done();
  });
  //should successfully delete a user with user id
  it("should return a status code of 400 and a message while login ", async (done) => {
    await request(app)
      .delete("/apis/users/delete/" + id)
      .set("Content-type", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("user deleted successfully");
      });
    done();
  });
});
