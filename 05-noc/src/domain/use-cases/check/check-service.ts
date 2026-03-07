import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";
interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {
  constructor(
    // private is used to automatically create and initialize class properties from constructor parameters
    // readonly indicates that the property cannot be reassigned after initialization
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback,
  ) {
    // Initialize any necessary properties or dependencies here
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`HTTP error! status: ${req.status}, url: ${url}`);
      }

      const log = new LogEntity(LogSeverityLevel.low, `Service ${url} working`);

      this.logRepository.saveLog(log);
      this.successCallback(); // Call the success callback if the request was successful

      return true; // Return true if the request was successful
    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity(LogSeverityLevel.high, errorMessage);

      this.logRepository.saveLog(log);
      this.errorCallback(errorMessage); // Call the error callback if there was an error

      return false; // Return false if there was an error fetching the URL
    }
  }
}
