const fs = require("fs");
const content = fs.readFileSync("README.md", "utf8");

const words = content.split(" ");
// const reactWords = words.filter((word) =>
//   word.toLowerCase().includes("react")
// ).length;

const reactWords = content.match(/react/gi).length;

console.log("Words: ", words.length);
console.log("Words React: ", reactWords);
