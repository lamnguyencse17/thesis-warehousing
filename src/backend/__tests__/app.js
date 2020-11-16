import request from "supertest";
import app from "../app";

describe('Test the functionalities of API', () => {
    test("API should respond to the simplest request to the root", done => {
        request(app).get("/").then(response => {
            expect(response.statusCode).toBe(200);
            done();
        });
    });
});
