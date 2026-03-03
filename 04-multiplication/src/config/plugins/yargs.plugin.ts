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
  .option("n", {
    alias: "name",
    type: "string",
    default: "multiplication-table",
    description: "Custom name for the output file (without extension)",
  })
  .option("d", {
    alias: "destination",
    type: "string",
    default: "./outputs",
    description: "Custom destination directory for the output file",
  })
  .check((argv, options) => {
    if (argv.b < 1) throw "Error: The base number must be greater than 0";
    if (argv.l < 1) throw "Error: The limit number must be greater than 0";
    return true;
  })
  .parseSync() as Arguments;
