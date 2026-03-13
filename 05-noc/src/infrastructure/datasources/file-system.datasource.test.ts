import * as fs from "fs";
import path = require("path");
import { FileSystemDataSource } from "./file-system.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("file-system.datasource.ts", () => {
  const logPath = path.join(__dirname, "../../../logs");
  const allLogsPath = path.join(logPath, "logs-all.log");
  const mediumLogsPath = path.join(logPath, "logs-medium.log");
  const highLogsPath = path.join(logPath, "logs-high.log");

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  test("should create log files if they do not exists", () => {
    new FileSystemDataSource();

    const files = fs.readdirSync(logPath);

    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  test("should save a log in logs-all.log", () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      origin: "file-system.datasource.test.ts",
      message: "Test log",
      level: LogSeverityLevel.low,
      createdAt: new Date(),
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(allLogsPath, "utf-8").trim().split("\n");

    expect(allLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-medium.log", () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      origin: "file-system.datasource.test.ts",
      message: "Test log",
      level: LogSeverityLevel.medium,
      createdAt: new Date(),
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(allLogsPath, "utf-8").trim().split("\n");
    const mediumLogs = fs
      .readFileSync(mediumLogsPath, "utf-8")
      .trim()
      .split("\n");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(mediumLogs).toContain(JSON.stringify(log));
  });

  test("should save a log in logs-all.log and logs-high.log", () => {
    const logDataSource = new FileSystemDataSource();
    const log = new LogEntity({
      origin: "file-system.datasource.test.ts",
      message: "Test log",
      level: LogSeverityLevel.high,
      createdAt: new Date(),
    });

    logDataSource.saveLog(log);

    const allLogs = fs.readFileSync(allLogsPath, "utf-8").trim().split("\n");
    const highLogs = fs.readFileSync(highLogsPath, "utf-8").trim().split("\n");

    expect(allLogs).toContain(JSON.stringify(log));
    expect(highLogs).toContain(JSON.stringify(log));
  });

  test("should return all logs", async () => {
    const logDataSource = new FileSystemDataSource();
    const log1 = new LogEntity({
      origin: "file-system.datasource.test.ts",
      message: "Test log 1",
      level: LogSeverityLevel.low,
      createdAt: new Date(),
    });
    const log2 = new LogEntity({
      origin: "file-system.datasource.test.ts",
      message: "Test log 2",
      level: LogSeverityLevel.medium,
      createdAt: new Date(),
    });
    const log3 = new LogEntity({
      origin: "file-system.datasource.test.ts",
      message: "Test log 3",
      level: LogSeverityLevel.high,
      createdAt: new Date(),
    });

    await logDataSource.saveLog(log1);
    await logDataSource.saveLog(log2);
    await logDataSource.saveLog(log3);

    const logsLow = await logDataSource.getLogs(LogSeverityLevel.low);
    const logsMedium = await logDataSource.getLogs(LogSeverityLevel.medium);
    const logsHigh = await logDataSource.getLogs(LogSeverityLevel.high);

    expect(logsLow).toEqual(expect.arrayContaining([log1, log2, log3]));
    expect(logsMedium).toEqual(expect.arrayContaining([log2]));
    expect(logsHigh).toEqual(expect.arrayContaining([log3]));
  });
});
