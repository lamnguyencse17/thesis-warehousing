import { validateCreateUser, validateLogInUser } from "../userValidator";

describe("Test Login User Validator", () => {
	test("Pass case", (done) => {
		const passCase = { email: "lamnguyen@gmail.com", password: "123456", role:{userType: 2, scope: []}};
		expect(validateLogInUser(passCase)).toEqual(
			expect.objectContaining({
				status: true,
				message: [],
			})
		);
		done();
	});
	test("Missing email", (done) => {
		const testcase = { password: "123456", role:{userType: 2, scope: []} };
		expect(validateLogInUser(testcase)).toEqual(
			expect.objectContaining({
				status: false,
				message: ["Invalid email"],
			})
		);
		done();
	});
	test("Missing password", (done) => {
		const testcase = { email: "lamnguyen@gmail.com", role:{userType: 2, scope: []} };
		expect(validateLogInUser(testcase)).toEqual(
			expect.objectContaining({
				status: false,
				message: ["Invalid password"],
			})
		);
		done();
	});
	test("Missing both", (done) => {
		const testcase = {role:{userType: 2, scope: []}};
		expect(validateLogInUser(testcase)).toEqual(
			expect.objectContaining({
				status: false,
				message: ["Invalid email", "Invalid password"],
			})
		);
		done();
	});
});

describe("Test Register User Validator", () => {
	test("Pass case", (done) => {
		const passCase = {
			email: "lamnguyen@gmail.com",
			password: "123456",
			name: "Lam",
			role: {userType: 2, scope: []} 
		};
		expect(validateCreateUser(passCase)).toEqual(
			expect.objectContaining({
				status: true,
				message: [],
			})
		);
		done();
	});
	test("Missing email", (done) => {
		const testCase = { password: "123456", name: "Lam", role:{userType: 2, scope: []} };
		expect(validateCreateUser(testCase)).toEqual(
			expect.objectContaining({
				status: false,
				message: ["Invalid email"],
			})
		);
		done();
	});
	test("Missing password", (done) => {
		const testCase = { email: "lamnguyen@gmail.com", name: "Lam", role:{userType: 2, scope: []} };
		expect(validateCreateUser(testCase)).toEqual(
			expect.objectContaining({
				status: false,
				message: ["Invalid password"],
			})
		);
		done();
	});
	test("Missing name", (done) => {
		const testCase = { email: "lamnguyen@gmail.com", password: "123456", role:{userType: 2, scope: []} };
		expect(validateCreateUser(testCase)).toEqual(
			expect.objectContaining({
				status: false,
				message: ["Invalid name"],
			})
		);
		done();
	});
	test("Missing email and password", (done) => {
		const testCase = { name: "Lam Nguyen", role:{userType: 2, scope: []} };
		expect(validateCreateUser(testCase)).toEqual(
			expect.objectContaining({
				status: false,
				message: ["Invalid email", "Invalid password"],
			})
		);
		done();
	});
	test("Missing everything", (done) => {
		const testCase = {};
		expect(validateCreateUser(testCase)).toEqual(
			expect.objectContaining({
				status: false,
				message: ["Invalid name", "Invalid email", "Invalid password", "Invalid role"],
			})
		);
		done();
	});
});
