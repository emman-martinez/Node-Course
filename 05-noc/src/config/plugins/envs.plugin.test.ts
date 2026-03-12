import { envs } from "./envs.plugin";

describe("envs.plugin.ts", () => {
  test("should return env options", () => {
    expect(envs).toEqual({
      MAILER_EMAIL: "emasesosos@gmail.com",
      MAILER_SECRET_KEY: "rxytetbcpdhdoups",
      MAILER_SERVICE: "gmail",
      MONGO_DB_NAME: "NOC-TEST",
      MONGO_PASS: "123456789",
      MONGO_URL: "mongodb://emmanuel:123456789@localhost:27017",
      MONGO_USER: "emmanuel",
      PORT: 3000,
      POSTGRES_URL: "postgresql://postgres:123456789@localhost:5432/NOC-TEST",
      PROD: false,
    });
  });

  test("should return error if not found env", async () => {
    jest.resetModules();
    process.env.PORT = "ABC";

    try {
      await import("./envs.plugin");
      expect(true).toBe(false); // This line should not be reached
    } catch (error) {
      expect(`${error}`).toContain(
        'EnvVarError: env-var: \"PORT\" should be a valid integer',
      );
    }
  });
});
