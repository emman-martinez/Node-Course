import CronService from "./cron/cron-service";

class Server {
  // public: accessible from anywhere
  // static: belongs to the class, not an instance of the class
  public static start() {
    console.log("Server started");
    CronService.createJob("*/5 * * * * *", () => {
      const date = new Date();
      console.log("Cron job executed every 5 seconds", date);
    });
  }
}

export default Server;
