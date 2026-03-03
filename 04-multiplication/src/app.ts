import { Arguments } from "yargs";
import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp, RunOptions } from "./presentation/server-app";

(async () => {
  await main();
})();

async function main() {
  const {
    base,
    destination,
    limit,
    name,
    s: showTable,
  } = yarg as Arguments<RunOptions>;

  ServerApp.run({
    base,
    destination,
    limit,
    name,
    showTable: showTable as boolean,
  });
}
