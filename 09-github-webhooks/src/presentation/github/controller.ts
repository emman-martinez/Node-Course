import { Request, Response } from "express";

export class GithubController {
  constructor() {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("X-GitHub-Event") ?? "unknown";
    const signature = req.header("X-Hub-Signature-256") ?? "unknown";
    const payload = req.body;

    console.log({ githubEvent, signature });
    res.status(201).send("Accepted");
  };
}
