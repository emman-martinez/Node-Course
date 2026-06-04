import express from "express";
import { envs } from "./config";
import { GithubController } from "./presentation/github/controller";
import { GithubSha256Middleware } from "./presentation/middlewares/github-sha256.middleware";

(() => {
  main();
})();

function main() {
  const app = express();
  const controller = new GithubController();

  app.use(express.json()); // Middleware to parse JSON bodies
  app.use(GithubSha256Middleware.verifyGithubSignature); // Middleware to verify GitHub signature
  app.post("/api/github", controller.webhookHandler);

  app.listen(envs.PORT, () => {
    console.log(`Server is running on port ${envs.PORT}`);
  });
}
