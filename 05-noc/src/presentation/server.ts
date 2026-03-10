import { CheckService } from "../domain/use-cases/check/check-service";
import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl";
import CronService from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemDataSource = new FileSystemDataSource();

const fileSystemLogRepository = new LogRepositoryImpl(fileSystemDataSource);

class Server {
  // public: accessible from anywhere
  // static: belongs to the class, not an instance of the class
  public static start() {
    console.log("Server started");

    // Send Email
    // const emailService = new EmailService(fileSystemLogRepository);
    // emailService.sendEmail({
    //   to: "emasesosos@gmail.com",
    //   subject: "Test Email from Node.js",
    //   htmlBody: "<h1>Hello from Node.js!</h1><p>This is a test email.</p>",
    // });
    // emailService.sendEmailWithFileSystemLogs("emasesosos@gmail.com");

    // const successCallback = (url: string) => {
    //   console.log(`Successfully checked URL: ${url}`);
    // };

    // const errorCallback = (error: string) => {
    //   console.log(error);
    // };

    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com";
    //   const handleSuccessCallback = () => successCallback(url);

    //   const checkService = new CheckService(
    //     fileSystemLogRepository,
    //     handleSuccessCallback,
    //     errorCallback,
    //   );

    //   checkService.execute(url);

    //   // new CheckService(successCallback, errorCallback).execute("http://localhost:3000");
    // });
  }
}

export default Server;
