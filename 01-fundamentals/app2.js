const fs = require("fs");
const data = fs.readFileSync("README.md", "utf8");
const newData = data.replace(/React/gi, "Angular");

fs.writeFileSync("README-Angular.md", newData);
console.log(
  "Replaced all occurrences of 'React' with 'Angular' in README-Angular.md"
);
