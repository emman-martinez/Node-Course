import { GitHubStarPayload } from "../../interfaces";

export class GitHubService {
  constructor() {}

  onStar(payload: GitHubStarPayload): string {
    let message: string = "";
    const { action, repository, sender } = payload;

    message = `User ${sender.login} ${action} star on the repository ${repository.full_name}`;

    return message;
  }

  onIssues(payload: GitHubStarPayload): string {
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
