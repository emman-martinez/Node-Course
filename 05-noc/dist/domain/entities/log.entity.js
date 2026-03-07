"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogEntity = exports.LogSeverityLevel = void 0;
var LogSeverityLevel;
(function (LogSeverityLevel) {
    LogSeverityLevel["low"] = "low";
    LogSeverityLevel["medium"] = "medium";
    LogSeverityLevel["high"] = "high";
})(LogSeverityLevel || (exports.LogSeverityLevel = LogSeverityLevel = {}));
class LogEntity {
    level; //  Enum
    message;
    createdAt;
    constructor(level, message) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }
}
exports.LogEntity = LogEntity;
//# sourceMappingURL=log.entity.js.map