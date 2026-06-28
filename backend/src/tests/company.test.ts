import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("create job end points tests", () => {
  it("returns 401 for unauthorized job post", async () => {
    const jobData = {
      title: "Full stack developer",
      description: "We are looking for a full stack developer...",
      jobType: "Contract",
      locationType: "Remote",
    };

    const response = await request(app).post("/company/postJob").send(jobData);

    expect(response.status).toEqual(401);
    expect(response.body).toEqual({
      message: "Unauthorized access, signup or login",
    });
  });
  it("returns a status of 201 if the company exists and the job was posted", async () => {
    const companyToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJjb21wYW55IiwiaWF0IjoxNjg2NjM2ODQ4LCJleHAiOjE2ODY2MzYwNDh9.jz4wZoZlX9vEh8aCQOZGg4YdXaBxLlP6zR2yFy2W2C0";
    const jobData = {
      companyId: 100000,
      title: "Full stack developer",
      description: "We are looking for a full stack developer...",
      jobType: "Contract",
      locationType: "Remote",
    };

    const response = await request(app)
      .set("companyToken", companyToken)
      .post("/company/postJob")
      .send(jobData);
    expect(response.status).toEqual(201);
    expect(response.body).toEqual({ message: "" });
  });
});
