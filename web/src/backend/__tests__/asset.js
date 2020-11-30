import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import assetModel from "../models/assets";
import passport from "passport";
import userModel from "../models/users";
import { hashPassword } from "../utils/password";

let savedCookies;

describe("Test Asset related API", () => {
	process.env.MODE = "test";
	let TestObj;
	let testUser;
	beforeAll(async () => {
		require("../utils/passport")(passport);
		await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		testUser = await userModel.create({
			name: "Test User",
			password: await hashPassword("123456"),
			email: "testUser0@gmail.com",
		});
		TestObj = await assetModel.create({
			name: "Thung Tao Test",
			quantity: 3,
			unit: 0,
			description: "Thung Tao Test",
			owner: testUser._id,
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
				expect(JSON.stringify(response.body)).toEqual(
					JSON.stringify({
						_id: TestObj._id,
						name: "Thung Tao Test",
						quantity: 3,
						unit: 0,
						description: "Thung Tao Test",
						owner: testUser._id,
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
			.post(`/api/assets/`)
			.send({
				assets: [{
					name: "Thung Tao Test 2",
					quantity: 5,
					unit: 0,
					description: "Thung Tao Test"
				}],
				owner: testUser._id.toString(),
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			//   .set("Cookie", savedCookies)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body).toEqual([
					{
						_id: expect.any(String),
						name: "Thung Tao Test 2",
						quantity: 5,
						unit: 0,
						description: "Thung Tao Test", 
						owner: testUser._id.toString(),
					}
				]
				);
				done();
			});
	});
	it("Create New Asset - Missing name", async (done) => {
		const expecting = ["Invalid name"];
		request(app)
			.post(`/api/assets/`)
			.send({
				assets: [{
					quantity: 5,
					unit: 0,
					description: "Thung Tao Test"
				}],
				owner: testUser._id,
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
	it("Create New Asset - Missing quantity", async (done) => {
		const expecting = ["Invalid quantity"];
		request(app)
			.post(`/api/assets/`)
			.send({
				assets: [{
					name: "Thung Tao Test 2",
					unit: 0,
					description: "Thung Tao Test"
				}],
				owner: testUser._id,
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
	it("Create New Asset - Invalid unit", async (done) => {
		const expecting = ["Invalid unit"];
		request(app)
			.post(`/api/assets/`)
			.send({
				assets: [{
					name: "Thung Tao Test 2",
					quantity: 5,
					unit: -2,
					description: "Thung Tao Test"
				}],
				owner: testUser._id,
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
	it("Create New Asset - Missing 2 value", async (done) => {
		const expecting = ["Invalid unit", "Invalid quantity"];
		request(app)
			.post(`/api/assets/`)
			.send({
				assets: [{
					name: "Thung Tao Test 2",
					description: "Thung Tao Test"
				}],
				owner: testUser._id,
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
});
