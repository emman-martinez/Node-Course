import yargs, { Arguments } from "yargs";
import { hideBin } from "yargs/helpers";

export const yarg = yargs(hideBin(process.argv)).parseSync() as Arguments;
