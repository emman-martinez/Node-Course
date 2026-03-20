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
    createdAt: null,
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
      return res
        .status(400)
        .json({ error: `Invalid id: ${req.params.id} parameter` });

    const todo = todos.find((t) => t.id === id);

    if (!todo)
      return res.status(404).json({ error: `Todo with id: ${id} not found` });

    res.json(todo);
  };

  public createTodo = (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      createdAt: null,
    };

    todos.push(newTodo);

    res.json(newTodo);
  };
}
