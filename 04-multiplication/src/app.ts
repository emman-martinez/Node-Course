import { Arguments } from "yargs";
import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp, RunOptions } from "./presentation/server-app";

(async () => {
  await main();
})();

async function main() {
  const { base, limit, show } = yarg as Arguments<RunOptions>;

  ServerApp.run({
    base,
    limit,
    show,
  });
}
