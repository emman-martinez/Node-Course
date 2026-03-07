import * as fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource implements LogDataSource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    // Initialize the log directory and files if they don't exist
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) return;
        fs.writeFileSync(path, "");
      },
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logEntry = JSON.stringify(newLog) + "\n";

    fs.appendFileSync(this.allLogsPath, logEntry);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logEntry);
    }

    if (newLog.level === LogSeverityLevel.high) {
      fs.appendFileSync(this.highLogsPath, logEntry);
    }
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {}
}
