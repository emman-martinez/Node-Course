import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
export declare abstract class LogDataSource {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
//# sourceMappingURL=log.datasource.d.ts.map