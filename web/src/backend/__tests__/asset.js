import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import assetModel from "../models/assets";
import { hashPassword } from "../utils/password";
import setCookie from "set-cookie-parser";
import passport from "passport";

let savedCookies;

describe("Test User related API", () => {
  let TestObj;
  beforeAll(async () => {
    require("../utils/passport")(passport);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    TestObj = await assetModel.create({
      name: "Thung Tao Test",
      quantity: 3,
      unit: 0,
      description: "Thung Tao Test",
    });
  });

  afterAll(async (done) => {
    await assetModel.deleteOne({ name: "Thung Tao Test" }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await assetModel.deleteOne({ name: "Thung Tao Test 2" }, (err) => {
        if (err) {
          console.log(err);
        }
      });
    mongoose.disconnect(done);
  });

  // it('Login With Agent', async (done) => {
  //     request(app).post("/api/auth/login").send({
  //         "password": "123456",
  //         "email": "testUser0@gmail.com"
  //     })
  //         .set("Content-Type", "application/json")
  //         .set("Accept", "application/json")
  //         .then(response => {
  //             const cookies = setCookie.parse(response, {
  //                 map: true,
  //             });
  //             expect(response.statusCode).toBe(200);
  //             expect(response.body).toEqual(expect.objectContaining({
  //                 "token": expect.any(String)
  //             }));
  //             expect(cookies.token).toEqual(expect.objectContaining({
  //                 name: "token",
  //                 value: expect.any(String),
  //                 httpOnly: true
  //             }));
  //             savedCookies = response.headers['set-cookie'];
  //             done();
  //         });
  // });

  it("Get Asset Info", async (done) => {
    request(app)
      .get(`/api/assets/${TestObj._id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
    //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: "Thung Tao Test",
            quantity: 3,
            unit: 0,
            description: "Thung Tao Test",
            __v: 0,
          })
        );
        done();
      });
  });
  it("Get Asset Info - Bad ID", async (done) => {
    request(app)
      .get(`/api/assets/5fb392d6dab9670184275ecd`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
    //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  it("Create New Asset - Success", async (done) => {
    request(app)
      .post(`/api/assets/`).send({
        name: "Thung Tao Test 2",
        quantity: 5,
        unit: 0,
        description: "Thung Tao Test"
     })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
    //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            name: "Thung Tao Test 2",
            quantity: 5,
            unit: 0,
            description: "Thung Tao Test",
            __v: 0,
          })
        );
        done();
      });
  });
  it("Create New Asset - Missing name", async (done) => {
      const expecting = ["Invalid name"];
    request(app)
      .post(`/api/assets/`).send({
        quantity: 5,
        unit: 0,
        description: "Thung Tao Test"
     })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
    //   .set("Cookie", savedCookies)
    .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.objectContaining({
            message: expect.arrayContaining(expecting)
        }));
        done();
    });
  });
  it("Create New Asset - Missing quantity", async (done) => {
    const expecting = ["Invalid quantity"];
  request(app)
    .post(`/api/assets/`).send({
    name: "Thung Tao Test 2",
      unit: 0,
      description: "Thung Tao Test"
   })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
  //   .set("Cookie", savedCookies)
  .then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
          message: expect.arrayContaining(expecting)
      }));
      done();
  });
});
it("Create New Asset - Invalid unit", async (done) => {
    const expecting = ["Invalid unit"];
  request(app)
    .post(`/api/assets/`).send({
    name: "Thung Tao Test 2",
    quantity: 5,
      unit: -2,
      description: "Thung Tao Test"
   })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
  //   .set("Cookie", savedCookies)
  .then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
          message: expect.arrayContaining(expecting)
      }));
      done();
  });
});
it("Create New Asset - Missing 2 value", async (done) => {
    const expecting = ["Invalid unit", "Invalid quantity"];
  request(app)
    .post(`/api/assets/`).send({
    name: "Thung Tao Test 2",
      description: "Thung Tao Test"
   })
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
  //   .set("Cookie", savedCookies)
  .then(response => {
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual(expect.objectContaining({
          message: expect.arrayContaining(expecting)
      }));
      done();
  });
});
//   test("Failed Token", async (done) => {
//     const failedToken = [
//       "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkzZTE2MTAzN2QyODBlYmYxODZhNGUiLCJlbWFpbCI6ImxhbW5ndXllbkBnbWFpbC5jb20iLCJpYXQiOjE2MDM1NDc4OTcsImV4cCI6MTYwMzU0Nzg5N30.Xj288yOh-m4OQAXe4lsuwz3CrDU3sSlHNh9bNF9738M; Max-Age=3600; Path=/; Expires=Sat, 24 Oct 2020 12:53:31 GMT; HttpOnly",
//     ];
//     request(app)
//       .get("/api/user")
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json")
//       .set("Cookie", failedToken)
//       .then((response) => {
//         expect(response.statusCode).toBe(401);
//         expect(response.body).toStrictEqual({
//           message: "You are not logged in or cookie has expired",
//         });
//         done();
//       });
//   });

//   test("Random Token", async (done) => {
//     const failedToken = [
//       "token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkzZTE2MTAzN2QyODBlYmYxODZhM2QiLCJlbWFpbCI6ImxhbW5ndXllbkBnbWFpbC5jb20iLCJpYXQiOjE2MDM1NDc4OTcsImV4cCI6MTYwMzU1MTQ5N30.YFGqJ340JOuWCLB21DtPNDYgKbrBV-XoKJOI78tFmu8; Max-Age=3600; Path=/; Expires=Sat, 24 Oct 2020 12:53:31 GMT; HttpOnly",
//     ];
//     request(app)
//       .get("/api/user")
//       .set("Content-Type", "application/json")
//       .set("Accept", "application/json")
//       .set("Cookie", failedToken)
//       .then((response) => {
//         expect(response.statusCode).toBe(401);
//         expect(response.body).toStrictEqual({
//           message: "You are not logged in or cookie has expired",
//         });
//         done();
//       });
//   });
});
