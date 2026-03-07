// "abstract" is used to define a base class that cannot be instantiated directly,
// but can be extended by other classes. It serves as a blueprint for other classes to implement
// specific functionality related to logging data sources.

import { LogEntity, LogSeverityLevel } from "../entities/log.entity";

export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}
