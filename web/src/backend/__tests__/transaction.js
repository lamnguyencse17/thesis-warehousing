import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import transactionModel from "../models/transactions";
import passport from "passport";
import userModel from "../models/users";
import assetModel from "../models/assets";

describe("Test Transaction related API", () => {
  let User1;
  let User2;
  let Asset;
  let TestObj;
  beforeAll(async () => {
    require("../utils/passport")(passport);
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    User1 = await userModel.create({
      name: "Lam Nguyen1",
      email: "lamnguyen1@gmail.com",
      password: "123456",
    });
    User2 = await userModel.create({
      name: "Lam Nguyen2",
      email: "lamnguyen2@gmail.com",
      password: "123456",
    });
    Asset = await assetModel.create({
      name: "Thung Tao",
      quantity: 5,
      unit: 0,
      description: "",
    });
    TestObj = await transactionModel.create({
      sender: `${User1._id}`,
      receiver: `${User2._id}`,
      assets: [`${Asset._id}`],
    });
  });

  afterAll(async (done) => {
    await transactionModel.deleteOne({ sender: `${User1._id}` }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await transactionModel.deleteOne({ sender: `${User2._id}` }, (err) => {
      if (err) {
        console.log(err);
      }
    });
    await assetModel.deleteOne({ _id: mongoose.Types.ObjectId(Asset._id) });
    await userModel.deleteOne({ _id: mongoose.Types.ObjectId(User1._id) });
    await userModel.deleteOne({ _id: mongoose.Types.ObjectId(User2._id) });
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

  it("Get Transaction Info", async (done) => {
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
            assets: expect.arrayContaining([
              {
                _id: `${Asset._id}`,
                name: "Thung Tao",
              },
            ]),
            receiver: {
              _id: `${User2._id}`,
              name: "Lam Nguyen2",
            },
            sender: {
              _id: `${User1._id}`,
              name: "Lam Nguyen1",
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
        sender: `${User2._id}`,
        receiver: `${User1._id}`,
        assets: [`${Asset._id}`],
      })
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      //   .set("Cookie", savedCookies)
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            assets: expect.arrayContaining([
              {
                _id: `${Asset._id}`,
                name: "Thung Tao",
              },
            ]),
            receiver: {
              _id: `${User1._id}`,
              name: "Lam Nguyen1",
            },
            sender: {
              _id: `${User2._id}`,
              name: "Lam Nguyen2",
            },
            __v: 0,
          })
        );
        done();
      });
  });
  it("Create Transaction - Empty Assets", async (done) => {
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
