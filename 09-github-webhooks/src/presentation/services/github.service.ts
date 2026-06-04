import { GitHubStarPayload } from "../../interfaces";

export class GitHubService {
  constructor() {}

  onStar(payload: GitHubStarPayload): string {
    let message: string = "";
    const { action, repository, sender } = payload;

    message = `User ${sender.login} ${action} star on the repository ${repository.full_name}}`;

    return message;
  }
}
