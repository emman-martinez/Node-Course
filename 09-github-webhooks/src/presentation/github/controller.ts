import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";

export class GithubController {
  constructor(private readonly githubService = new GitHubService()) {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("X-GitHub-Event") ?? "unknown";
    const payload = req.body;
    let message: string = "";

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

    console.log({ message });

    res.status(201).send("Accepted");
  };
}
