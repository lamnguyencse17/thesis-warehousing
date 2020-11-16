import mongoose from "mongoose";
import userModel from "../../models/users";
import { getUserById, getUserByEmail, createUser } from "../user";
import { hashPassword } from "../../utils/password";

describe('Test User Service', () => {
    let testUser;
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        testUser = await userModel.create({
            "name": "Test User",
            "password": await hashPassword("123456"),
            "email": "testUser@gmail.com",
        });
    });

    afterAll(async (done) => {
        await userModel.deleteOne({ email: "testUser@gmail.com" }, (err) => {
            if (err) {
                console.log(err);
            }
        });
        await userModel.deleteOne({ email: "testUser2@gmail.com" }, (err) => {
            if (err) {
                console.log(err);
            }
        });
        mongoose.disconnect(done);
    });
    test("Get User With ID", async (done) => {
        const user = await getUserById(testUser._id);
        expect(user.status).toBeTruthy();
        expect(user.result).toEqual(expect.objectContaining({
            _id: expect.anything(),
            name: "Test User",
            password: expect.any(String),
            email: "testUser@gmail.com",
            __v: 0
        })
        );
        done();
    });
    test("Get User With non-existing ID", async (done) => {
        const user = await getUserById("5f93f82ff6e0c7147b994506");
        expect(user.status).toBeFalsy();
        done();
    });
    test("Get User With Email", async (done) => {
        const user = await getUserByEmail(testUser.email);
        expect(user.status).toBeTruthy();
        expect(user.result).toEqual(expect.objectContaining({
            _id: expect.anything(),
            name: "Test User",
            password: expect.any(String),
            email: "testUser@gmail.com",
            __v: 0
        })
        );
        done();
    });
    test("Get User With non-existing Email", async (done) => {
        const user = await getUserByEmail("non@gmail.com");
        expect(user.status).toBeFalsy();
        done();
    });
    test("Create User", async (done) => {
        const user = await createUser({
            "name": "Test User 2",
            "password": await hashPassword("123456"),
            "email": "testUser2@gmail.com"
        });
        expect(user.status).toBeTruthy();
        expect(user.result).toEqual(expect.objectContaining({
            _id: expect.anything(),
            name: "Test User 2",
            password: expect.any(String),
            email: "testUser2@gmail.com",
            __v: 0
        }));
        done();
    });
});
