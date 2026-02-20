console.log(process.env);

const { SHELL } = process.env;
// console.log(`Your shell is: ${SHELL}`);
// console.log(`Homebrew is installed at: ${HOMEBREW_PREFIX}`);
export const characters = ["Luke", "Leia", "Han", "Chewbacca", "Yoda"];

const [_, __, ___, fourth] = characters;

console.log(`The fourth character is: ${fourth}`);
