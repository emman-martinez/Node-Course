export enum LogSeverityLevel {
  low = "low",
  medium = "medium",
  high = "high",
}

export interface LogEntityOptions {
  level: LogSeverityLevel;
  message: string;
  origin: string;
  createdAt?: Date;
}

export class LogEntity {
  public level: LogSeverityLevel; //  Enum
  public message: string;
  public createdAt: Date;
  public origin: string;

  constructor(options: LogEntityOptions) {
    const { level, message, origin, createdAt = new Date() } = options;

    this.level = level;
    this.message = message;
    this.origin = origin;
    this.createdAt = createdAt;
  }

  static fromJSON(json: string): LogEntity {
    const { createdAt, level, message, origin } = JSON.parse(json);
    const log = new LogEntity({ level, message, origin, createdAt });
    log.createdAt = new Date(createdAt);

    return log;
  }

  static fromObject = (object: { [key: string]: any }): LogEntity => {
    const { createdAt, level, message, origin } = object;

    const log = new LogEntity({ level, message, origin, createdAt });

    return log;
  };
}
