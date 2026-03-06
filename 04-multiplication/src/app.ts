import { Arguments } from "yargs";
import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp, RunOptions } from "./presentation/server-app";

(async () => {
  await main();
})();

async function main() {
  const {
    b: base,
    d: destination,
    l: limit,
    n: name,
    s: showTable,
  } = yarg as Arguments<RunOptions>;

  ServerApp.run({
    base: base as number,
    destination: destination as string,
    limit: limit as number,
    name: name as string,
    showTable: showTable as boolean,
  });
}
