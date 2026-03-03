import { yarg } from "./config/plugins/yargs.plugin";

// console.log(process.argv);
// console.log(yarg.b);

(async () => {
  await main();
})();

async function main() {
  console.log("Execited Main");
}
