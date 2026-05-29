import { Request, Response } from "express";

export class GithubController {
  constructor() {}

  webhookHandler = (req: Request, res: Response) => {
    console.log("Called endpoint");
    res.status(200).send("Webhook received");
  };
}
