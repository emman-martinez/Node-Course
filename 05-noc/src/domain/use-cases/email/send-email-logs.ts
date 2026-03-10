import { EmailService } from "../../../presentation/email/email-service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendLogEmailUseCase {
  execute(to: string | string[]): Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {
  constructor(
    private readonly emailService: EmailService,
    private readonly logRepository: LogRepository,
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
      if (!sent) {
        throw new Error("Failed to send email with logs");
      }

      const log = new LogEntity({
        level: LogSeverityLevel.low,
        message: `Email with logs sent to ${to}`,
        origin: "send-email-logs.ts",
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Failed to send email with logs to ${to}. Error: ${error}`,
        origin: "send-email-logs.ts",
      });

      this.logRepository.saveLog(log);

      return false;
    }
  }
}
