import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("user login", () => {
  it("sends an error if the email is missing", async () => {
    const loginCredentials = {
      userEmail: "",
      password: "RyanPassword",
    };
    const response = await request(app)
      .post("/user/logIn")
      .send(loginCredentials);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "Error, Incomplete data" });
  });
  it("sends an error if password is missing", async () => {
    const loginCredentials = {
      userEmail: "Ryan@blahblah.com",
      password: "",
    };
    const response = await request(app)
      .post("/user/logIn")
      .send(loginCredentials);

    expect(response.status).toEqual(400);
    expect(response.body).toEqual({ message: "Error, Incomplete data" });
  });

  it("returns a 401 if email and password don't match", async () => {
    const loginCredentials = {
      userEmail: "Ryan@blahblah.com",
      password: "Ryan4629",
    };
    const response = await request(app)
      .post("/user/logIn")
      .send(loginCredentials);
    expect(response.status).toEqual(401);
    expect(response.body).toEqual({ message: "Invalid credentials" });
  });

  it("logs in successfully if credentials match", async () => {
    const loginCredentials = {
      userEmail: "Ryan@blahblah.com",
      password: "Ryan123",
    };
    const response = await request(app)
      .post("/user/logIn")
      .send(loginCredentials);
    expect(response.status).toEqual(200);
    expect(response.body).toContain({ message: "Successfully logged in" });
  });
});
