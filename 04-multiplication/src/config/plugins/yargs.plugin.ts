import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv))
  .option("b", {
    alias: "base",
    type: "number",
    description: "Base number for multiplication",
    demandOption: true,
  })
  .option("l", {
    alias: "limit",
    type: "number",
    description: "Limit number for multiplication",
    default: 10,
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    description: "Show the multiplication table in the console",
    default: false,
  })
  .parseSync() as Arguments;
