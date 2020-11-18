import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import transactionModel from "../models/transactions";
import passport from "passport";

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
    TestObj = await transactionModel.create({
      sender: "5fb4b239b32c2c2ba44f23f5",
      receiver: "5fb411df8173b602387d8768",
      assets: ["5fb392d6dab9670184275ece"],
    });
  });

  afterAll(async (done) => {
    await transactionModel.deleteOne(
      { sender: "5fb4b239b32c2c2ba44f23f5" },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
    await transactionModel.deleteOne(
      { sender: "5fb4b239b32c2c2ba44f23f6" },
      (err) => {
        if (err) {
          console.log(err);
        }
      }
    );
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
      .get(`/api/transactions/${TestObj._id}`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            assets: [
              {
                _id: "5fb392d6dab9670184275ece",
                name: "Thung Tao",
              },
            ],
            receiver: {
              _id: "5fb411df8173b602387d8768",
              name: "Lam Nguyen",
            },
            sender: {
              _id: "5fb4b239b32c2c2ba44f23f5",
              name: "Lam Nguyen",
            },
            __v: 0,
          })
        );
        done();
      });
  });
  it("Get Transaction Info - Bad ID", async (done) => {
    request(app)
      .get(`/api/transactions/5fb392d6dab9670184275ecd`)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });
  it("Create Transaction Asset - Success", async (done) => {
    request(app)
      .post(`/api/transactions/`)
      .send({
        sender: "5fb4b239b32c2c2ba44f23f6",
        receiver: "5fb411df8173b602387d8768",
        assets: ["5fb392d6dab9670184275ece"],
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            sender: "5fb4b239b32c2c2ba44f23f6",
            receiver: "5fb411df8173b602387d8768",
            assets: ["5fb392d6dab9670184275ece"],
          })
        );
        done();
      });
  });
  it("Create Transaction Asset - Empty Assets", async (done) => {
    const expecting = ["Assets are empty"];
    request(app)
      .post(`/api/transactions/`)
      .send({
        sender: "5fb4b239b32c2c2ba44f23f6",
        receiver: "5fb411df8173b602387d8768",
        assets: [],
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(expecting),
          })
        );
        done();
      });
  });
  it("Create Transaction Asset - Failed ID", async (done) => {
    const expecting = ["Invalid sender"];
    request(app)
      .post(`/api/transactions/`)
      .send({
        sender: "5fb4b239b32c2c2ba44f23fg",
        receiver: "5fb411df8173b602387d8768",
        assets: ["5fb411df8173b602387d8768"],
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(
          expect.objectContaining({
            message: expect.arrayContaining(expecting),
          })
        );
        done();
      });
  });
  //   it("Create New Asset - Missing name", async (done) => {
  //     const expecting = ["Invalid name"];
  //     request(app)
  //       .post(`/api/transactions/`)
  //       .send({
  //         quantity: 5,
  //         unit: 0,
  //         description: "Thung Tao Test",
  //       })
  //       .set("Content-Type", "application/json")
  //       .set("Accept", "application/json")
  //       //   .set("Cookie", savedCookies)
  //       .then((response) => {
  //         expect(response.statusCode).toBe(400);
  //         expect(response.body).toEqual(
  //           expect.objectContaining({
  //             message: expect.arrayContaining(expecting),
  //           })
  //         );
  //         done();
  //       });
  //   });
  //   it("Create New Asset - Missing quantity", async (done) => {
  //     const expecting = ["Invalid quantity"];
  //     request(app)
  //       .post(`/api/transactions/`)
  //       .send({
  //         name: "Thung Tao Test 2",
  //         unit: 0,
  //         description: "Thung Tao Test",
  //       })
  //       .set("Content-Type", "application/json")
  //       .set("Accept", "application/json")
  //       //   .set("Cookie", savedCookies)
  //       .then((response) => {
  //         expect(response.statusCode).toBe(400);
  //         expect(response.body).toEqual(
  //           expect.objectContaining({
  //             message: expect.arrayContaining(expecting),
  //           })
  //         );
  //         done();
  //       });
  //   });
  //   it("Create New Asset - Invalid unit", async (done) => {
  //     const expecting = ["Invalid unit"];
  //     request(app)
  //       .post(`/api/transactions/`)
  //       .send({
  //         name: "Thung Tao Test 2",
  //         quantity: 5,
  //         unit: -2,
  //         description: "Thung Tao Test",
  //       })
  //       .set("Content-Type", "application/json")
  //       .set("Accept", "application/json")
  //       //   .set("Cookie", savedCookies)
  //       .then((response) => {
  //         expect(response.statusCode).toBe(400);
  //         expect(response.body).toEqual(
  //           expect.objectContaining({
  //             message: expect.arrayContaining(expecting),
  //           })
  //         );
  //         done();
  //       });
  //   });
  //   it("Create New Asset - Missing 2 value", async (done) => {
  //     const expecting = ["Invalid unit", "Invalid quantity"];
  //     request(app)
  //       .post(`/api/transactions/`)
  //       .send({
  //         name: "Thung Tao Test 2",
  //         description: "Thung Tao Test",
  //       })
  //       .set("Content-Type", "application/json")
  //       .set("Accept", "application/json")
  //       //   .set("Cookie", savedCookies)
  //       .then((response) => {
  //         expect(response.statusCode).toBe(400);
  //         expect(response.body).toEqual(
  //           expect.objectContaining({
  //             message: expect.arrayContaining(expecting),
  //           })
  //         );
  //         done();
  //       });
  //   });
});
