"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemDataSource = void 0;
const fs = require("fs");
class FileSystemDataSource {
    logPath = "logs/";
    lowLogsPath = "logs/logs-low.log";
    mediumLogsPath = "logs/logs-medium.log";
    highLogsPath = "logs/logs-high.log";
    constructor() {
        // Initialize the log directory and files if they don't exist
        this.createLogsFiles();
    }
    createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [this.lowLogsPath, this.mediumLogsPath, this.highLogsPath].forEach((path) => {
            if (fs.existsSync(path))
                return;
            fs.writeFileSync(path, "");
        });
    };
    saveLog(log) { }
    getLogs(severityLevel) { }
}
exports.FileSystemDataSource = FileSystemDataSource;
//# sourceMappingURL=file-system.datasource.js.map