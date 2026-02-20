import { characters } from "../../src/js-foundation/02-destructuring";

describe("js-foundation/02-destructuring", () => {
  test("Characters should contain Luke, Leia", () => {
    // dont forget that toContain is case sensitive
    expect(characters).toContain("Luke");
    expect(characters).toContain("Leia");
  });

  test("First character should be Luke, and second Leia", () => {
    const [first, second] = characters;
    expect(first).toBe("Luke");
    expect(second).toBe("Leia");
  });
});
