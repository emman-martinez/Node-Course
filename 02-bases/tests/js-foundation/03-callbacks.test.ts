import getUserById from "../../src/js-foundation/03-callbacks";

describe("js-foundation/03-callbacks.ts", () => {
  // done is used to indicate that the test is asynchronous and will call done() when it's finished
  test("getUserById should return an error if user does not exist", (done) => {
    const id = 10;

    getUserById(id, (error, user) => {
      expect(error).toBe(`User with id ${id} not found`);
      expect(user).toBeUndefined();

      done();
    });
  });
});
