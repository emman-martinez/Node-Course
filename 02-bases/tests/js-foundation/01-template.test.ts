import emailTemplate from "../../src/js-foundation/01-template";

describe("js-foundation/01-template.ts", () => {
  test("emailTemplate should contain a greeting", () => {
    expect(emailTemplate).toContain("Hi, ");
  });

  test("emailTemplate should contain {{name}} {{orderId}}", () => {
    // toMatch is more flexible, it can be a string or a regex
    expect(emailTemplate).toMatch(/{{name}}/);
    expect(emailTemplate).toMatch(/{{orderId}}/);

    // toContain is more strict, it only works with strings
    expect(emailTemplate).toContain("{{name}}");
    expect(emailTemplate).toContain("{{orderId}}");
  });
});
