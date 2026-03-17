import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log-repository.impl";

describe("LogRepositoryImpl", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("saveLog should call the datasource with arguments", async () => {
    const logEntity = new LogEntity({
      message: "Test log message",
      level: LogSeverityLevel.high,
      createdAt: new Date(),
      origin: "log-repository.impl.test.ts",
    });

    await logRepository.saveLog(logEntity);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(logEntity);
  });

  test("getLogs should call the datasource with arguments", async () => {
    const severityLevel = LogSeverityLevel.high;

    await logRepository.getLogs(severityLevel);
    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(severityLevel);
  });
});
