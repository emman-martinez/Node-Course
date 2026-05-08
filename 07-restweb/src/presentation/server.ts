import compression from "compression";
import express, { type Request, type Response, type Router } from "express";
import path from "path";

interface Options {
  port: number;
  publicPath?: string;
  routes: Router;
}

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, publicPath = "public", routes } = options;
    this.port = port;
    this.publicPath = publicPath;
    this.routes = routes;
  }

  async start() {
    /* Middlewares */

    // Middleware to parse JSON bodies (e.g., application/json, raw)
    this.app.use(express.json());
    // Middleware to parse URL-encoded data (e.g., form submissions, x-www-form-urlencoded)
    this.app.use(express.urlencoded({ extended: true }));
    // Middleware to compress response bodies for all requests
    this.app.use(compression());

    /* Public folder */
    this.app.use(express.static(this.publicPath));

    /* Routes */
    this.app.use(this.routes);

    // Fallback to index.html for SPA routing
    this.app.use((req: Request, res: Response) => {
      const indexPath = path.join(
        __dirname,
        "../../",
        this.publicPath,
        "index.html",
      );
      res.sendFile(indexPath);
    });

    /* Start the server */
    this.serverListener = this.app.listen(this.port, () => {
      console.log(`Server is running on port: ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
