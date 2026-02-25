import getAge from "../../src/plugins/get-age.plugin";

describe("plugins/getAge.plugin.ts", () => {
  test("getAge() should return the age of a person", () => {
    const birthday = "1985-10-21";
    const age = getAge(birthday);
    expect(typeof age).toBe("number");
  });

  test("getAge() should return current age", () => {
    const birthday = "1985-10-21";
    const age = getAge(birthday);
    const calculatedAge =
      new Date().getFullYear() - new Date(birthday).getFullYear();

    expect(age).toBe(calculatedAge);
  });

  test("getAge() should return 0 years", () => {
    const spy = jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(1995);
    const birthday = "1995-10-21";
    const age = getAge(birthday);
    expect(age).toBe(0);
    expect(spy).toHaveBeenCalled();
  });
});
