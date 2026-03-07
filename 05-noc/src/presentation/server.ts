import { CheckService } from "../domain/use-cases/check/check-service";
import CronService from "./cron/cron-service";

class Server {
  // public: accessible from anywhere
  // static: belongs to the class, not an instance of the class
  public static start() {
    console.log("Server started");

    const successCallback = (url: string) => {
      console.log(`Successfully checked URL: ${url}`);
    };

    const errorCallback = (error: string) => {
      console.log(error);
    };

    CronService.createJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";
      new CheckService(() => successCallback(url), errorCallback).execute(url);
      // new CheckService(successCallback, errorCallback).execute("http://localhost:3000");
    });
  }
}

export default Server;
