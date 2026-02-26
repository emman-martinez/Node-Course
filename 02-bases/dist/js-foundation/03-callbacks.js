const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
];
export const getUserById = (id, callback) => {
    const user = users.find(function (user) {
        return user.id === id;
    });
    if (!user) {
        return callback(`User with id ${id} not found`);
    }
    return callback(null, user);
};
export default getUserById;
// export const getUserById: GetUserById = (id, callback) => {
//   const user = users.find(function (user) {
//     return user.id === id;
//   });
//   if (!user) {
//     setTimeout(() => {
//       callback(`User with id ${id} not found`);
//     }, 2500);
//     return;
//   }
//   return callback(null, user);
// };
//# sourceMappingURL=03-callbacks.js.map