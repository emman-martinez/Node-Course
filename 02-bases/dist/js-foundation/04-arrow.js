const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
];
const getUserById = (id, callback) => {
    const user = users.find((user) => user.id === id);
    return user
        ? callback(null, user)
        : callback(`User with id ${id} not found`, null);
};
export default getUserById;
//# sourceMappingURL=04-arrow.js.map