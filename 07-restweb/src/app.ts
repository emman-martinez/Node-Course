import { Server } from "./presentation/server";

(async () => {
  main();
})();

function main() {
  const server = new Server("public", 3000);
  server.start();
}
