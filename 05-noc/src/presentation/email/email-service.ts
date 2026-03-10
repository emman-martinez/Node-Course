import * as nodemailer from "nodemailer";
import { envs } from "../../config/plugins/envs.plugin";
import { LogRepository } from "../../domain/repository/log.repository";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

interface SendEmailOptions {
  to: string | string[];
  subject: string;
  htmlBody: string;
  attachments?: Attachment[];
}

interface Attachment {
  filename: string;
  path: string;
}

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: envs.MAILER_SERVICE,
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_SECRET_KEY,
    },
  });

  constructor(private readonly logRepository: LogRepository) {}

  async sendEmail(options: SendEmailOptions): Promise<boolean> {
    const { to, subject, htmlBody, attachments = [] } = options;

    try {
      const sentInformation = await this.transporter.sendMail({
        to,
        subject,
        html: htmlBody,
        attachments,
      });

      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Email sent to ${to} with subject "${subject}"`,
        origin: "email.service.ts",
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        level: LogSeverityLevel.high,
        message: `Failed to send email to ${to} with subject "${subject}". Error: ${error}`,
        origin: "email.service.ts",
      });

      this.logRepository.saveLog(log);

      return false;
    }
  }

  async sendEmailWithFileSystemLogs(to: string | string[]) {
    const subject = "File System Logs";
    const htmlBody =
      "<h1>File System Logs</h1><p>Please find the attached logs.</p>";

    const attachments: Attachment[] = [
      {
        filename: "logs-all.log",
        path: "./logs/logs-all.log",
      },
      {
        filename: "logs-high.log",
        path: "./logs/logs-high.log",
      },
      {
        filename: "logs-medium.log",
        path: "./logs/logs-medium.log",
      },
    ];

    return this.sendEmail({ to, subject, htmlBody, attachments });
  }
}
