"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubService = void 0;
class GitHubService {
    constructor() { }
    onStar(payload) {
        let message = "";
        const { action, repository, sender } = payload;
        message = `User ${sender.login} ${action} star on the repository ${repository.full_name}`;
        return message;
    }
    onIssues(payload) {
        const { action, issue } = payload;
        if (!issue) {
            return "No issue information provided in the payload.";
        }
        if (action === "opened") {
            return `Issue #${issue.number} opened: ${issue.title}`;
        }
        if (action === "closed") {
            return `Issue #${issue.number} was closed:  ${issue.title} by ${issue.user.login}`;
        }
        if (action === "reopened") {
            return `Issue #${issue.number} was reopened:  ${issue.title} by ${issue.user.login}`;
        }
        return `Received unsupported issue event: ${action}`;
    }
}
exports.GitHubService = GitHubService;
