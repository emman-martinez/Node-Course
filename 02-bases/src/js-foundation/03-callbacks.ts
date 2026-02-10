interface GetUserById {
  (
    id: number,
    callback: (
      error: string | null,
      user?: { id: number; name: string },
    ) => void,
  ): void;
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

const getUserById: GetUserById = (id, callback) => {
  const user = users.find(function (user) {
    return user.id === id;
  });

  if (!user) {
    return callback(`User with id ${id} not found`);
  }

  return callback(null, user);
};

export default getUserById;
