import { CheckService } from "../domain/use-cases/check/check-service";
import CronService from "./cron/cron-service";

class Server {
  // public: accessible from anywhere
  // static: belongs to the class, not an instance of the class
  public static start() {
    console.log("Server started");

    CronService.createJob("*/5 * * * * *", () => {
      new CheckService().execute("https://www.google.com");
    });
  }
}

export default Server;
