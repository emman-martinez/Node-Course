import * as fs from "node:fs";
import { yarg } from "./config/plugins/yargs.plugin";
import { Arguments } from "yargs";

interface Args {
  base: number;
  limit: number;
  show: boolean;
}

const { base, limit, show: showTable } = yarg as Args & Arguments;

const line = "=".repeat(50);
const title = `Tabla del ${base}`;
const titlePadding = Math.floor((line.length - title.length) / 2);

const header =
  line +
  "\n" +
  " ".repeat(Math.max(0, titlePadding)) +
  title +
  "\n" +
  line +
  "\n";

let row = "";

for (let i = 1; i <= limit; i++) {
  row += `${base} x ${i} = ${base * i}\n`;
}

row = header + "\n" + row;
if (showTable) console.log(row);

const outputDir = "outputs";
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(`${outputDir}/tabla-${base}.txt`, row);

console.log(
  `File "tabla-${base}.txt" has been created in the "outputs" directory.`,
);
