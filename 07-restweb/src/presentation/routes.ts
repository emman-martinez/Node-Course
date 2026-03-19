import { Router } from "express";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    router.get("/api/health", (req, res) => {
      res.json({ status: "ok" });
    });

    router.get("/api/todos", (req, res) => {
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
    });

    return router;
  }
}
