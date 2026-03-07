export declare enum LogSeverityLevel {
    low = "low",
    medium = "medium",
    high = "high"
}
export declare class LogEntity {
    level: LogSeverityLevel;
    message: string;
    createdAt: Date;
    constructor(level: LogSeverityLevel, message: string);
}
//# sourceMappingURL=log.entity.d.ts.map