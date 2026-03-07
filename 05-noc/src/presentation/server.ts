import { CronJob } from "cron";

class Server {
  // public: accessible from anywhere
  // static: belongs to the class, not an instance of the class
  public static start() {
    console.log("Server started");

    const job = new CronJob(
      "*/3 * * * * *", // cronTime
      () => {
        const date = new Date();
        console.log(`3 seconds ${date}`);
      },
    );

    job.start();
  }
}

export default Server;
