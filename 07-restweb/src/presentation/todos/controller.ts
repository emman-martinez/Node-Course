import { Request, Response } from "express";

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json([
      {
        id: 1,
        title: "Learn TypeScript",
        completed: false,
        createdAt: new Date(),
      },
      {
        id: 2,
        title: "Build a Node.js app",
        completed: true,
        createdAt: new Date(),
      },
      {
        id: 3,
        title: "Deploy to production",
        completed: false,
        createdAt: new Date(),
      },
    ]);
  };
}
