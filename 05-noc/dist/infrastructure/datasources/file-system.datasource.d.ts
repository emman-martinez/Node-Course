import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
export declare class FileSystemDataSource implements LogDataSource {
    private readonly logPath;
    private readonly lowLogsPath;
    private readonly mediumLogsPath;
    private readonly highLogsPath;
    constructor();
    private createLogsFiles;
    saveLog(log: LogEntity): Promise<void>;
    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
//# sourceMappingURL=file-system.datasource.d.ts.map