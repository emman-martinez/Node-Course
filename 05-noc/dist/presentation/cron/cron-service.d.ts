import { CronJob } from "cron";
type CronTime = string | Date;
type OnTick = () => void;
declare class CronService {
    static createJob(cronTime: CronTime, onTick: OnTick): CronJob;
}
export default CronService;
//# sourceMappingURL=cron-service.d.ts.map