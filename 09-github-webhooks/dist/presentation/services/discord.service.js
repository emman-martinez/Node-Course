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
exports.DiscordService = void 0;
const config_1 = require("../../config");
class DiscordService {
    constructor() {
        this.discordWebhookUrl = config_1.envs.DISCORD_WEBHOOK_URL;
    }
    notify(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = {
                content: message,
            };
            const response = yield fetch(this.discordWebhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                console.error(`Failed to send notification to Discord. Status: ${response.status}, Response: ${yield response.text()}`);
                return false;
            }
            return true;
        });
    }
}
exports.DiscordService = DiscordService;
