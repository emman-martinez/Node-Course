import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe("check-service.ts", () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };
  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckService(
    mockLogRepository,
    mockSuccessCallback,
    mockErrorCallback,
  );

  // Clear all mocks before each test to ensure a clean state
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call successCallback when fetch return true", async () => {
    const wasOk = await checkService.execute(
      "https://jsonplaceholder.typicode.com/todos/1",
    );

    expect(wasOk).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "low",
        message: "Service https://jsonplaceholder.typicode.com/todos/1 working",
        origin: "check-service.ts",
      }),
    );
  });

  test("should call errorCallback when fetch return false", async () => {
    const wasOk = await checkService.execute(
      "https://jsonplaceholdercfgdgh.typicode.com/todos/1",
    );

    expect(wasOk).toBe(false);
    expect(mockSuccessCallback).not.toHaveBeenCalled();
    expect(mockErrorCallback).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
  });
});
