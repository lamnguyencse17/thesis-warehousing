import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import userModel from "../models/users";

describe('Test Register API', () => {
    beforeAll(() => {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
    });

    afterAll(async (done) => {
        await userModel.deleteOne({email: "testuser@gmail.com"}, (err) => {
            if(err){
                console.log(err);
            }
        });
        mongoose.disconnect(done);
    });    
    test("Success Registration", done => {
        request(app).post("/api/auth/register").send({
            "name": "Test User",
            "password": "123456",
            "email": "testuser@gmail.com"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({
                "name": "Test User",
                "email": "testuser@gmail.com"
            }));
            done();
        });
    });
    test("Duplicate Email", async done => {
        await userModel.create({"name": "Test User",
        "password": "123456",
        "email": "testuser@gmail.com"});

        request(app).post("/api/auth/register").send({
            "name": "Test User",
            "password": "123456",
            "email": "testuser@gmail.com"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .then(response => {
            expect(response.statusCode).toBe(400);
            expect(response.body).toEqual(expect.objectContaining({
                "message": "Duplicate Email!"
            }));
            done();
        });
    });
    test("Missing Email", done => {
        const expecting = ["Invalid email"];
        request(app).post("/api/auth/register").send({
            "name": "Test User",
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
    test("Missing Name", done => {
        const expecting = ["Invalid name"];
        request(app).post("/api/auth/register").send({
            "password": "123456",
            "email": "testuser@gmail.com"
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
        request(app).post("/api/auth/register").send({
            "name": "Test User",
            "email": "testuser@gmail.com"
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
        request(app).post("/api/auth/register").send({
            "name": "Test User",
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
    test("Missing Everything", done => {
        const expecting = ["Invalid password", "Invalid email", "Invalid name"];
        request(app).post("/api/auth/register").send({
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
