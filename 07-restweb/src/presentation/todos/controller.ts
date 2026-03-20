import { Request, Response } from "express";

const todos = [
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
];

export class TodosController {
  constructor() {}

  public getTodos = (req: Request, res: Response) => {
    res.json(todos);
  };

  public getTodoById = (req: Request, res: Response) => {
    const id = +req.params.id!;

    if (isNaN(id))
      res.status(400).json({ error: `Invalid id: ${req.params.id} parameter` });

    const todo = todos.find((t) => t.id === id);

    if (!todo) {
      return res.status(404).json({ error: `Todo with id: ${id} not found` });
    }

    res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const body = req.body;
    res.json(body);
  };
}
