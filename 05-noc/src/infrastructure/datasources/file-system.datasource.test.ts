import * as fs from "fs";
import path = require("path");
import { FileSystemDataSource } from "./file-system.datasource";

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

    expect(files).toEqual(["logs-all.log", "logs-medium.log", "logs-high.log"]);
  });
});
