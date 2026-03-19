import * as express from "express";
import * as path from "path";

interface Options {
  port: number;
  publicPath?: string;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly publicPath: string;

  constructor(options: Options) {
    const { port, publicPath = "public" } = options;
    this.port = port;
    this.publicPath = publicPath;
  }

  async start() {
    // Middleware and routes would be set up here

    // Public folder
    this.app.use(express.static(this.publicPath));

    // Routes
    this.app.get("/api/health", (req, res) => {
      res.json({ status: "ok" });
    });

    this.app.get("/api/todos", (req, res) => {
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

    // Fallback to index.html for SPA routing
    this.app.use((req, res) => {
      const indexPath = path.join(
        __dirname,
        "../../",
        this.publicPath,
        "index.html",
      );
      res.sendFile(indexPath);
    });

    // Start the server
    this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`);
    });
  }
}
