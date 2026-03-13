import { LogEntity } from "../../entities/log.entity";
import { SendEmailLogs } from "./send-email-logs";

describe("send-email-logs.ts", () => {
  const mockEmailService = {
    sendEmailWithFileSystemLogs: jest.fn().mockResolvedValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogs = new SendEmailLogs(
    mockEmailService as any,
    mockLogRepository,
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should call sendEmail and saveLog", async () => {
    const result = await sendEmailLogs.execute("emasesosos@gamil.com");

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1,
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "low",
        origin: "send-email-logs.ts",
        message: "Email with logs sent to emasesosos@gamil.com",
        createdAt: expect.any(Date),
      }),
    );
  });

  test("should log in case of error", async () => {
    mockEmailService.sendEmailWithFileSystemLogs.mockRejectedValueOnce(false);

    const result = await sendEmailLogs.execute("emasesosos@gamil.com");

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFileSystemLogs).toHaveBeenCalledTimes(
      1,
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity),
    );
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.objectContaining({
        level: "high",
        origin: "send-email-logs.ts",
        message:
          "Failed to send email with logs to emasesosos@gamil.com. Error: false",
        createdAt: expect.any(Date),
      }),
    );
  });
});
