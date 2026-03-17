import { EmailService, SendEmailOptions } from "./email-service";
import * as nodemailer from "nodemailer";

describe("email-service.ts", () => {
  const mockSendMail = jest.fn();

  (nodemailer.createTransport as jest.Mock) = jest.fn().mockReturnValue({
    sendMail: mockSendMail,
  });

  const emailService = new EmailService();

  test("should send email", async () => {
    const options: SendEmailOptions = {
      to: "emasesosos@gmail.com",
      subject: "Test Email",
      htmlBody: "<p>This is a test email.</p>",
    };

    await emailService.sendEmail(options);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: options.to,
      subject: options.subject,
      html: options.htmlBody,
      attachments: [],
    });
  });

  test("should send email with attachments", async () => {
    const email = "emasesosos@gmail.com";
    await emailService.sendEmailWithFileSystemLogs(email);

    expect(mockSendMail).toHaveBeenCalledWith({
      to: email,
      subject: "File System Logs",
      html: "<h1>File System Logs</h1><p>Please find the attached logs.</p>",
      attachments: [
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
      ],
    });
  });
});
