// 01
// import emailTemplate from "./js-foundation/01-template.js";
// console.log(emailTemplate);

// 02
// import "./js-foundation/02-destructuring.js";

// 03
// import getUserById from "./js-foundation/03-callbacks.js";

// const id = 1;

// const user = getUserById(id, function (error, user) {
//   if (error) {
//     throw new Error(error);
//   }

//   return user;
// });

// console.log("User found:", user);

// 04
// import getUserById from "./js-foundation/04-arrow.js";

// const id = 1;

// const user = getUserById(id, (error, user) => {
//   if (error) throw new Error(error);

//   return user;
// });

// console.log("User found:", user);

// 05

// import buildMakePerson from "./js-foundation/05-factory.js";
// import getAge from "./plugins/get-age.plugin.js";
// import uuidv4 from "./plugins/get-id.plugin.js";

// const makePerson = buildMakePerson({
//   getAge,
//   uuidv4,
// });

// const obj = {
//   name: "John Doe",
//   birthday: "1990-04-25",
// };

// const john = makePerson(obj);

// console.log(john);

// 06 Promises
// import getPokemonById from "./js-foundation/06-promises.js";

// getPokemonById(4)
//   .then((name) => console.log("Pokémon name:", name))
//   .catch((error) => console.error("Error fetching Pokémon:", error))
//   .finally(() => console.log("Operation completed."));

// 07 Promises Async/Await
import getPokemonById from "./js-foundation/07-async-await.js";

getPokemonById(4)
  .then((name) => console.log("Pokémon name:", name))
  .catch((error) => console.error("Error fetching Pokémon:", error))
  .finally(() => console.log("Operation completed."));

// Node Logger - Winston
import buildLogger from "./plugins/logger.plugin.js";
const logger = buildLogger("app.js");

logger.log("This is an informational message from app.js!");
logger.error("This is an error message from app.js!");
