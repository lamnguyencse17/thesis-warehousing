import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import setCookie from "set-cookie-parser";
import userModel from "../models/users";
import { hashPassword } from "../utils/password";

describe('Test Login API functionalities', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        await userModel.create({
            "name": "Test User",
            "password": await hashPassword("123456"),
            "email": "testUser0@gmail.com",
        });
    });

    afterAll(async (done) => {
        await userModel.deleteOne({email: "testUser0@gmail.com"}, (err) => {
            if(err){
                console.log(err);
            }
        });
        mongoose.disconnect(done);
    });
    test("Success Login", done => {
        request(app).post("/api/auth/login").send({
            "password": "123456",
            "email": "testUser0@gmail.com"
        })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .then(response => {
                const cookies = setCookie.parse(response, {
                    map: true,
                });
                expect(response.statusCode).toBe(200);
                expect(response.body).toEqual(expect.objectContaining({
                    "token": expect.any(String)
                }));
                expect(cookies.token).toEqual(expect.objectContaining({
                    name: "token",
                    value: expect.any(String),
                    httpOnly: true
                }));
                done();
            });
    });
    test("User Not Found", done => {
        request(app).post("/api/auth/login").send({
            "password": "123456",
            "email": "lamnguyen1000@gmail.com"
        })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual(expect.objectContaining({
                    message: "User is not found"
                }));
                done();
            });
    });
    test("Wrong Password", done => {
        request(app).post("/api/auth/login").send({
            "password": "1234567",
            "email": "testUser0@gmail.com"
        })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual(expect.objectContaining({
                    message: "Password is incorrect"
                }));
                done();
            });
    });
    test("Missing Email", done => {
        const expecting = ["Invalid email"];
        request(app).post("/api/auth/login").send({
            "password": "123456",
        })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual(expect.objectContaining({
                    message: expect.arrayContaining(expecting)
                }));
                done();
            });
    });
    test("Missing Password", done => {
        const expecting = ["Invalid password"];
        request(app).post("/api/auth/login").send({
            "email": "testUser@gmail.com"
        })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual(expect.objectContaining({
                    message: expect.arrayContaining(expecting)
                }));
                done();
            });
    });
    test("Missing Password And Email", done => {
        const expecting = ["Invalid password", "Invalid email"];
        request(app).post("/api/auth/login").send({
        })
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .then(response => {
                expect(response.statusCode).toBe(400);
                expect(response.body).toEqual(expect.objectContaining({
                    message: expect.arrayContaining(expecting)
                }));
                done();
            });
    });
});
