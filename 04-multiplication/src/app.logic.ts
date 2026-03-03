import * as fs from "node:fs";

const base = 5;
const limit = 10;

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
console.log(row);

const outputDir = "outputs";
fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(`${outputDir}/tabla-${base}.txt`, row);

console.log(
  `File "tabla-${base}.txt" has been created in the "outputs" directory.`,
);
