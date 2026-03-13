import mongoose from "mongoose";
import { envs } from "../../config/plugins/envs.plugin";
import { MongoDatabase } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoLogDataSource } from "./mongo-log.datasource";
import LogModel from "../../data/mongo/models/log.model";

describe("mongo-log.datasource.ts", () => {
  const logDataSource = new MongoLogDataSource();
  const log = new LogEntity({
    origin: "mongo-log.datasource.test.ts",
    message: "Test log message",
    level: LogSeverityLevel.low,
    createdAt: new Date(),
  });

  beforeAll(async () => {
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB_NAME,
      mongoUrl: envs.MONGO_URL,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany({});
  });

  afterAll(async () => {
    mongoose.connection.close();
  });

  test("should create a log", async () => {
    const logSpy = jest.spyOn(console, "log");

    await logDataSource.saveLog(log);

    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith("Mongo Log saved:", expect.any(String));
  });

  test("should get logs", async () => {
    await logDataSource.saveLog(log);
    await logDataSource.saveLog(log);
    const logs = await logDataSource.getLogs(LogSeverityLevel.low);

    expect(logs).toBeInstanceOf(Array);
    expect(logs.length).toBe(2);
    expect(logs[0]?.origin).toBe(log.origin);
    expect(logs[0]?.message).toBe(log.message);
    expect(logs[0]?.level).toBe(log.level);
  });
});
