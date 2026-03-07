"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
class CronService {
    static createJob(cronTime, onTick) {
        const job = new cron_1.CronJob(cronTime, // cronTime: Is a string representing the cron time or a Date object,
        onTick);
        job.start();
        return job;
    }
}
exports.default = CronService;
//# sourceMappingURL=cron-service.js.map