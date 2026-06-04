"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GithubController = void 0;
const github_service_1 = require("../services/github.service");
const discord_service_1 = require("../services/discord.service");
class GithubController {
    constructor(githubService = new github_service_1.GitHubService(), discordService = new discord_service_1.DiscordService()) {
        this.githubService = githubService;
        this.discordService = discordService;
        this.webhookHandler = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const githubEvent = (_a = req.header("X-GitHub-Event")) !== null && _a !== void 0 ? _a : "unknown";
            const payload = req.body;
            let message = "";
            switch (githubEvent) {
                case "star":
                    message = this.githubService.onStar(payload);
                    break;
                case "issues":
                    message = this.githubService.onIssues(payload);
                    break;
                default:
                    message = `Received unsupported event: ${githubEvent}`;
            }
            try {
                const notificationSent = yield this.discordService.notify(message);
                if (!notificationSent) {
                    return res.status(500).json("Internal Server Error");
                }
                return res.status(202).send("Accepted");
            }
            catch (error) {
                console.error("Error sending notification to Discord:", error);
                return res.status(500).json("Internal Server Error");
            }
        });
    }
}
exports.GithubController = GithubController;
