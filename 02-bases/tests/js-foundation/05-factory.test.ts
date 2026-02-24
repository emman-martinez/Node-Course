import buildMakePerson from "../../src/js-foundation/05-factory";

describe("js-foundation/05-factory", () => {
  const getAge = (birthday: string) => {
    const birthDate = new Date(birthday);
    const ageDifMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };
  const uuidv4 = () => "123e4567-e89b-12d3-a456-426614174000";

  test("buildMakePerson should return a function", () => {
    const makePerson = buildMakePerson({
      getAge,
      uuidv4,
    });
    expect(typeof makePerson).toBe("function");
  });

  test("makePerson should return a person", () => {
    const makePerson = buildMakePerson({
      getAge,
      uuidv4,
    });

    const person = makePerson({
      name: "John Doe",
      birthday: "1990-01-01",
    });

    expect(person).toEqual({
      id: "123e4567-e89b-12d3-a456-426614174000",
      name: "John Doe",
      birthday: "1990-01-01",
      age: 36,
    });
  });
});
