"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const controller_1 = require("./presentation/github/controller");
(() => {
    main();
})();
function main() {
    const app = (0, express_1.default)();
    const controller = new controller_1.GithubController();
    app.use(express_1.default.json()); // Middleware to parse JSON bodies
    app.post("/api/github", controller.webhookHandler);
    app.listen(config_1.envs.PORT, () => {
        console.log(`Server is running on port ${config_1.envs.PORT}`);
    });
}
