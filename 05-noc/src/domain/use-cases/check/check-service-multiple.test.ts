import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("check-service-multiple.ts", () => {
  const mockLogRepository1 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockLogRepository2 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockLogRepository3 = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkServiceMultiple = new CheckServiceMultiple(
    [mockLogRepository1, mockLogRepository2, mockLogRepository3],
    mockSuccessCallback,
    mockErrorCallback,
  );

  // Clear all mocks before each test to ensure a clean state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch return true", async () => {
    const wasOk = await checkServiceMultiple.execute(
      "https://jsonplaceholder.typicode.com/todos/1",
    );

    expect(wasOk).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "low",
        message: "Service https://jsonplaceholder.typicode.com/todos/1 working",
        origin: "check-service.ts",
      }),
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "low",
        message: "Service https://jsonplaceholder.typicode.com/todos/1 working",
        origin: "check-service.ts",
      }),
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "low",
        message: "Service https://jsonplaceholder.typicode.com/todos/1 working",
        origin: "check-service.ts",
      }),
    );
  });

  test("should call errorCallback when fetch return false", async () => {
    const wasOk = await checkServiceMultiple.execute(
      "https://jsonplaceholdercfgdgh.typicode.com/todos/1",
    );

    expect(wasOk).toBe(false);
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository1.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "high",
        message: expect.stringContaining(
          "https://jsonplaceholdercfgdgh.typicode.com/todos/1 is not working",
        ),
        origin: "check-service.ts",
      }),
    );
    expect(mockLogRepository2.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "high",
        message: expect.stringContaining(
          "https://jsonplaceholdercfgdgh.typicode.com/todos/1 is not working",
        ),
        origin: "check-service.ts",
      }),
    );
    expect(mockLogRepository3.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "high",
        message: expect.stringContaining(
          "https://jsonplaceholdercfgdgh.typicode.com/todos/1 is not working",
        ),
        origin: "check-service.ts",
      }),
    );
  });
});
