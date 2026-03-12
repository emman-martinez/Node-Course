import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void | undefined;
type ErrorCallback = (error: string) => void | undefined;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    // private is used to automatically create and initialize class properties from constructor parameters
    // readonly indicates that the property cannot be reassigned after initialization
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {
    // Initialize any necessary properties or dependencies here
  }

  private callLogs(log: LogEntity) {
    this.logRepository.forEach((logRepository) => logRepository.saveLog(log));
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}, url: ${url}`);
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Service ${url} working`,
        origin: "check-service.ts",
      });

      this.callLogs(log);
      this.successCallback() && this.successCallback(); // Call the success callback if the request was successful

      return true; // Return true if the request was successful
    } catch (error) {
      const errorMessage = `${url} is not working => ${error}`;
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: errorMessage,
        origin: "check-service.ts",
      });

      this.callLogs(log);
      this.errorCallback(errorMessage) && this.errorCallback(errorMessage); // Call the error callback if there was an error

      return false; // Return false if there was an error fetching the URL
    }
  }
}
