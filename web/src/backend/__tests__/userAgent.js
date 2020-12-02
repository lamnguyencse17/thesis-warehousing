import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import userModel from "../models/users";
import { hashPassword } from "../utils/password";
import setCookie from "set-cookie-parser";
import passport from "passport";
import assetModel from "../models/assets";

let savedCookies;

describe("API Integration Test", () => {
	process.env.MODE = "test";
	process.env.TEST_TYPE = "integrate";
	let testUser;
	let testUser2;
	let Asset;
	let DumbAsset;
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
			email: "testUser999@gmail.com",
		});
		testUser2 = await userModel.create({
			name: "Test User2",
			password: await hashPassword("123456"),
			email: "testUser9992@gmail.com",
		});
		Asset = await assetModel.create({
			name: "Thung Tao",
			quantity: 5,
			unit: 0,
			description: "",
			owner: testUser._id,
		});
		DumbAsset = await assetModel.create({
			name: "Thung Tao Dumb",
			quantity: 5,
			unit: 0,
			description: "",
			owner: testUser2._id,
		});
	});

	afterAll(async (done) => {
		await userModel.deleteMany({ email: "testUser999@gmail.com" }, (err) => {
			if (err) {
				console.log(err);
			}
		});
		await userModel.deleteMany({ email: "testUser9992@gmail.com" }, (err) => {
			if (err) {
				console.log(err);
			}
		});
		await userModel.deleteMany(
			{ _id: mongoose.Types.ObjectId(Asset._id) },
			(err) => {
				if (err) {
					console.log(err);
				}
			}
		);
		await userModel.deleteMany(
			{ _id: mongoose.Types.ObjectId(DumbAsset._id) },
			(err) => {
				if (err) {
					console.log(err);
				}
			}
		);
		mongoose.disconnect(done);
	});

	it("Login With Agent", async (done) => {
		request(app)
			.post("/api/auth/login")
			.send({
				password: "123456",
				email: "testUser999@gmail.com",
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.then((response) => {
				const cookies = setCookie.parse(response, {
					map: true,
				});
				expect(response.statusCode).toBe(200);
				expect(response.body).toEqual(
					expect.objectContaining({
						token: expect.any(String),
					})
				);
				expect(cookies.token).toEqual(
					expect.objectContaining({
						name: "token",
						value: expect.any(String),
						httpOnly: true,
					})
				);
				savedCookies = response.headers["set-cookie"];
				done();
			});
	});

	it("Get User Info", async (done) => {
		request(app)
			.get("/api/user")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Cookie", savedCookies)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						name: "Test User",
						email: "testUser999@gmail.com",
						__v: 0,
					})
				);
				done();
			});
	});

	it("Create Asset With Token", async (done) => {
		request(app)
			.post("/api/assets")
			.send({
				assets: [
					{
						name: "Thung Tao Test 2",
						quantity: 5,
						unit: 0,
						description: "Thung Tao Test",
					},
				],
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Cookie", savedCookies)
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
					},
				]);
				done();
			});
	});

	it("Create Asset With Token - 401 Error", async (done) => {
		request(app)
			.post("/api/assets")
			.send({
				assets: [
					{
						name: "Thung Tao Test 2",
						quantity: 5,
						unit: 0,
						description: "Thung Tao Test",
					},
				],
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.then((response) => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
	it("Create Transaction Asset - Success", async (done) => {
		request(app)
			.post(`/api/transactions/`)
			.send({
				sender: `${testUser._id}`,
				receiver: `${testUser2._id}`,
				assets: [`${Asset._id}`],
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Cookie", savedCookies)
			.then((response) => {
				expect(response.statusCode).toBe(200);
				expect(response.body).toEqual(
					expect.objectContaining({
						_id: expect.any(String),
						assets: expect.arrayContaining([
							{
								_id: `${Asset._id}`,
								name: `${Asset.name}`,
							},
						]),
						receiver: {
							_id: `${testUser2._id}`,
							name: "Test User2",
						},
						sender: {
							_id: `${testUser._id}`,
							name: "Test User",
						},
						__v: 0,
					})
				);
				done();
			});
	});
	it("Create Transaction Asset - 401 Error", async (done) => {
		request(app)
			.post(`/api/transactions/`)
			.send({
				sender: `${testUser._id}`,
				receiver: `${testUser2._id}`,
				assets: [`${Asset._id}`],
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.then((response) => {
				expect(response.statusCode).toBe(401);
				done();
			});
	});
	it("Create Transaction Asset - No Right", async (done) => {
		request(app)
			.post(`/api/transactions/`)
			.send({
				sender: `${testUser._id}`,
				receiver: `${testUser2._id}`,
				assets: [`${Asset._id}`],
			})
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Cookie", savedCookies)
			.then((response) => {
				expect(response.statusCode).toBe(400);
				expect(response.body).toStrictEqual({
					message: "Some assets do not belong to you",
				});
				done();
			});
	});
	test("Failed Token", async (done) => {
		const failedToken = [
			"token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkzZTE2MTAzN2QyODBlYmYxODZhNGUiLCJlbWFpbCI6ImxhbW5ndXllbkBnbWFpbC5jb20iLCJpYXQiOjE2MDM1NDc4OTcsImV4cCI6MTYwMzU0Nzg5N30.Xj288yOh-m4OQAXe4lsuwz3CrDU3sSlHNh9bNF9738M; Max-Age=3600; Path=/; Expires=Sat, 24 Oct 2020 12:53:31 GMT; HttpOnly",
		];
		request(app)
			.get("/api/user")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Cookie", failedToken)
			.then((response) => {
				expect(response.statusCode).toBe(401);
				expect(response.body).toStrictEqual({
					message: "You are not logged in or cookie has expired",
				});
				done();
			});
	});

	test("Random Token", async (done) => {
		const failedToken = [
			"token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjkzZTE2MTAzN2QyODBlYmYxODZhM2QiLCJlbWFpbCI6ImxhbW5ndXllbkBnbWFpbC5jb20iLCJpYXQiOjE2MDM1NDc4OTcsImV4cCI6MTYwMzU1MTQ5N30.YFGqJ340JOuWCLB21DtPNDYgKbrBV-XoKJOI78tFmu8; Max-Age=3600; Path=/; Expires=Sat, 24 Oct 2020 12:53:31 GMT; HttpOnly",
		];
		request(app)
			.get("/api/user")
			.set("Content-Type", "application/json")
			.set("Accept", "application/json")
			.set("Cookie", failedToken)
			.then((response) => {
				expect(response.statusCode).toBe(401);
				expect(response.body).toStrictEqual({
					message: "You are not logged in or cookie has expired",
				});
				done();
			});
	});
});
