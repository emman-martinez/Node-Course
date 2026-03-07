import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

class CronService {
  public static createJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(
      cronTime, // cronTime: Is a string representing the cron time or a Date object,
      onTick, // onTick: Is a callback function that will be executed when the cron job runs,
    );

    job.start();

    return job;
  }
}

export default CronService;
