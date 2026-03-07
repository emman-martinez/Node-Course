import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
export declare abstract class LogRepository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
//# sourceMappingURL=log.repository.d.ts.map