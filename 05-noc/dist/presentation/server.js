"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const check_service_1 = require("../domain/use-cases/check/check-service");
const cron_service_1 = require("./cron/cron-service");
class Server {
    // public: accessible from anywhere
    // static: belongs to the class, not an instance of the class
    static start() {
        console.log("Server started");
        const successCallback = (url) => {
            console.log(`Successfully checked URL: ${url}`);
        };
        const errorCallback = (error) => {
            console.log(error);
        };
        cron_service_1.default.createJob("*/5 * * * * *", () => {
            const url = "https://www.google.com";
            new check_service_1.CheckService(() => successCallback(url), errorCallback).execute(url);
            // new CheckService(successCallback, errorCallback).execute("http://localhost:3000");
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map