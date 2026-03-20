import { Request, Response } from "express";

interface Todo {
  id: number;
  title: string;
  subTypeId?: number | null;
  subType?: string | null;
  completed: boolean;
  createdAt: Date | null;
}

const todos: Todo[] = [
  {
    id: 1,
    title: "Learn TypeScript",
    subTypeId: 4,
    subType: "Programming",
    completed: false,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: "Build a Node.js app",
    subTypeId: 5,
    subType: "Programming Project",
    completed: true,
    createdAt: new Date(),
  },
  {
    id: 3,
    title: "Deploy to production",
    subTypeId: 6,
    subType: "Deployment",
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
      return res
        .status(400)
        .json({ error: `Invalid id: ${req.params.id} parameter` });

    const todo = todos.find((t) => t.id === id);

    if (!todo)
      return res.status(404).json({ error: `Todo with id: ${id} not found` });

    res.json(todo);
  };

  public getTodosBySubTypeId = (req: Request, res: Response) => {
    const subTypeId = +req.params.subTypeId!;

    if (isNaN(subTypeId))
      return res.status(400).json({
        error: `Invalid subTypeId: ${req.params.subTypeId} parameter`,
      });

    const filteredTodos = todos.filter((t) => t.subTypeId === subTypeId);

    res.json(filteredTodos);
  };

  public createTodo = (req: Request, res: Response) => {
    const { title } = req.body;

    if (!title) return res.status(400).json({ error: "Title is required" });

    const newTodo = {
      id: todos.length + 1,
      title,
      subTypeId: null,
      subType: null,
      completed: false,
      createdAt: null,
    };

    todos.push(newTodo);

    res.json(newTodo);
  };
}
