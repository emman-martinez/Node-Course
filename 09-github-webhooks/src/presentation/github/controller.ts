import { Request, Response } from "express";

export class GithubController {
  constructor() {}

  webhookHandler = (req: Request, res: Response) => {
    const githubEvent = req.header("X-GitHub-Event") ?? "unknown";
    const payload = req.body;

    console.log(JSON.stringify(payload));

    res.status(201).send("Accepted");
  };
}
