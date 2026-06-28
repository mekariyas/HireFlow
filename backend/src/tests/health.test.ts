import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../app.js";

describe("health check", () => {
  it("tests if the endpoint is accessible", async () => {
    const response = await request(app).get("/healthCheck");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "This end point works",
    });
  });
});
