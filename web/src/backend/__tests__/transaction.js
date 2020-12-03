import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import transactionModel from "../models/transactions";
import passport from "passport";
import userModel from "../models/users";
import assetModel from "../models/assets";
import { hashPassword } from "../utils/password";

describe("Test Transaction related API", () => {
	process.env.MODE = "test";
	process.env.TEST_TYPE = "unit";
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
			password: await hashPassword("123456"),
		});
		User2 = await userModel.create({
			name: "Lam Nguyen2",
			email: "lamnguyen2@gmail.com",
			password: await hashPassword("123456"),
		});
		Asset = await assetModel.create({
			name: "Thung Tao",
			quantity: 5,
			unit: 0,
			description: "",
			owner: User1._id,
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
				console.error(err);
			}
		});
		await transactionModel.deleteOne({ sender: `${User2._id}` }, (err) => {
			if (err) {
				console.error(err);
			}
		});
		await assetModel.deleteOne({ _id: mongoose.Types.ObjectId(Asset._id) });
		await userModel.deleteOne({ _id: mongoose.Types.ObjectId(User1._id) });
		await userModel.deleteOne({ _id: mongoose.Types.ObjectId(User2._id) });
		mongoose.disconnect(done);
	});
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
								name: Asset.name,
								quantity: Asset.quantity,
								unit: Asset.unit,
								description: ""
							},
						]),
						receiver: {
							_id: `${User2._id}`,
							name: User2.name,
							email: User2.email
						},
						sender: {
							_id: `${User1._id}`,
							name: User1.name,
							email: User1.email
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
				sender: `${User1._id}`,
				receiver: `${User2._id}`,
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
								name: Asset.name,
								quantity: Asset.quantity,
								unit: Asset.unit,
								description: ""
							},
						]),
						receiver: {
							_id: `${User2._id}`,
							name: User2.name,
							email: User2.email
						},
						sender: {
							_id: `${User1._id}`,
							name: User1.name,
							email: User1.email
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
		const expecting = ["Invalid receiver"];
		request(app)
			.post(`/api/transactions/`)
			.send({
				receiver: "5fb411df8173b602387d876",
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
