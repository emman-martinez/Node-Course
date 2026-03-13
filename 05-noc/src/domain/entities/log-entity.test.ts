import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("log-entity.ts", () => {
  const dataObj = {
    level: LogSeverityLevel.high,
    message: "This is a test log",
    origin: "log-entity.test.ts",
  };

  const json = `{
      "level": "medium",
      "message": "This is a test log from JSON",
      "origin": "log-entity.test.ts",
      "createdAt": "2024-06-01T12:00:00.000Z"
    }`;

  test("should create a LogEntity instance", () => {
    const log = new LogEntity(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(dataObj.level);
    expect(log.message).toBe(dataObj.message);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  test("should create a LogEntity instance from JSON", () => {
    const log = LogEntity.fromJSON(json);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(LogSeverityLevel.medium);
    expect(log.message).toBe("This is a test log from JSON");
    expect(log.origin).toBe("log-entity.test.ts");
    expect(log.createdAt.toISOString()).toBe("2024-06-01T12:00:00.000Z");
  });

  test("should create a LogEntity instance from object", () => {
    const log = LogEntity.fromObject(dataObj);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.level).toBe(dataObj.level);
    expect(log.message).toBe(dataObj.message);
    expect(log.origin).toBe(dataObj.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });
});
