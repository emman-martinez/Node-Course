import * as express from "express";
import * as path from "path";

export class Server {
  private app = express();
  private folder: string;
  private port: number;

  constructor(folder: string, port: number) {
    this.folder = folder;
    this.port = port;
  }

  async start() {
    // Middleware and routes would be set up here
    // Public folder
    this.app.use(express.static(this.folder));

    this.app.use((req, res) => {
      const indexPath = path.join(
        __dirname,
        "../../",
        this.folder,
        "index.html",
      );
      res.sendFile(indexPath);
    });

    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }
}
