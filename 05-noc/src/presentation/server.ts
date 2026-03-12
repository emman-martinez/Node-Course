import { CheckService } from "../domain/use-cases/check/check-service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl";
import CronService from "./cron/cron-service";
import { EmailService } from "./email/email-service";
import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogSeverityLevel } from "../domain/entities/log.entity";

const emailService = new EmailService();
const fileSystemDataSource = new FileSystemDataSource();
const mongoDataSource = new MongoLogDataSource();
const dataSources = { fileSystemDataSource, mongoDataSource };
const logRepoository = new LogRepositoryImpl(dataSources.mongoDataSource);

class Server {
  // public: accessible from anywhere
  // static: belongs to the class, not an instance of the class
  public static async start() {
    console.log("Server started");

    // Send Email
    // const sendEmailLogs = new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository,
    // );

    // sendEmailLogs.execute("emasesosos@gmail.com");

    // emailService.sendEmail({
    //   to: "emasesosos@gmail.com",
    //   subject: "Test Email from Node.js",
    //   htmlBody: "<h1>Hello from Node.js!</h1><p>This is a test email.</p>",
    // });
    // emailService.sendEmailWithFileSystemLogs("emasesosos@gmail.com");

    const logs = await logRepoository.getLogs(LogSeverityLevel.medium);
    console.log(logs);

    // const successCallback = (url: string) => {
    //   console.log(`Successfully checked URL: ${url}`);
    // };

    // const errorCallback = (error: string) => {
    //   console.log(error);
    // };

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.googledzfgdfgdfg.com";
    //   const handleSuccessCallback = () => successCallback(url);

    //   const checkService = new CheckService(
    //     logRepoository,
    //     handleSuccessCallback,
    //     errorCallback,
    //   );

    //   checkService.execute(url);
    // });
  }
}

export default Server;
