import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  const folder = "public";
  const port = 3000;
  const server = new Server(folder, port);

  server.start();
}
