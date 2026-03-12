// import { CheckService } from "../domain/use-cases/check/check-service";
// import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
// import { FileSystemDataSource } from "../infrastructure/datasources/file-system.datasource";
// import { LogRepositoryImpl } from "../infrastructure/repositories/log-repository.impl";
// import CronService from "./cron/cron-service";
// import { EmailService } from "./email/email-service";
// import { MongoLogDataSource } from "../infrastructure/datasources/mongo-log.datasource";
// import { LogSeverityLevel } from "../domain/entities/log.entity";
// import { PostgresLogDataSource } from "../infrastructure/datasources/postgres-log.datasource";
// import { CheckServiceMultiple } from "../domain/use-cases/check/check-service-multiple";

// const emailService = new EmailService();
// const fileSystemDataSource = new FileSystemDataSource();
// const mongoDataSource = new MongoLogDataSource();
// const postgresDataSource = new PostgresLogDataSource();
// const dataSources = {
//   fileSystemDataSource,
//   mongoDataSource,
//   postgresDataSource,
// };
// const singleLogRepoository = new LogRepositoryImpl(
//   dataSources.postgresDataSource,
// );

// const multipleLogRepository = [
//   new LogRepositoryImpl(dataSources.fileSystemDataSource),
//   new LogRepositoryImpl(dataSources.mongoDataSource),
//   new LogRepositoryImpl(dataSources.postgresDataSource),
// ];

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

    // const logs = await singleLogRepoository.getLogs(LogSeverityLevel.high);
    // console.log(logs);

    // const successCallback = (url: string) => {
    //   console.log(`Successfully checked URL: ${url}`);
    // };

    // const errorCallback = (error: string) => {
    //   console.log(error);
    // };

    // // Single repository
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com";
    //   const handleSuccessCallback = () => successCallback(url);

    //   const checkService = new CheckService(
    //     singleLogRepoository,
    //     handleSuccessCallback,
    //     errorCallback,
    //   );

    //   checkService.execute(url);
    // });

    // Multiple repositories
    // CronService.createJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com";
    //   const handleSuccessCallback = () => successCallback(url);

    //   const checkService = new CheckServiceMultiple(
    //     multipleLogRepository,
    //     handleSuccessCallback,
    //     errorCallback,
    //   );

    //   checkService.execute(url);
    // });
  }
}

export default Server;
