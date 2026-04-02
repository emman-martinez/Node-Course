import * as request from "supertest";
import { testServer } from "../../test-server";

describe("Todo route testing", () => {
  beforeAll(async () => {
    await testServer.start();
  });

  test("should return TODOs api/todos", async () => {
    const response = await request(testServer.app).get("/api/todos");

    console.log("Response body:", response.body);
  });
});
