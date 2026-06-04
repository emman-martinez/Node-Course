import { Request, Response } from "express";
import { GitHubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";

export class GithubController {
  constructor(
    private readonly githubService = new GitHubService(),
    private readonly discordService = new DiscordService(),
  ) {}

  webhookHandler = async (req: Request, res: Response) => {
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

    try {
      const notificationSent = await this.discordService.notify(message);

      if (!notificationSent) {
        return res.status(500).json("Internal Server Error");
      }

      return res.status(202).send("Accepted");
    } catch (error) {
      console.error("Error sending notification to Discord:", error);
      return res.status(500).json("Internal Server Error");
    }
  };
}
