jest.mock("uuid", () => ({
  v4: jest.fn(() => "123e4567-e89b-12d3-a456-426614174000"),
}));

import uuidv4 from "../../src/plugins/get-id.plugin";
import { v4 as uuidV4Mock } from "uuid";

describe("plugins/get-id.plugin.ts", () => {
  test("uuidv4() should return a UUID", () => {
    const uuid = uuidv4();

    expect(uuidV4Mock).toHaveBeenCalled();
    expect(typeof uuid).toBe("string");
    expect(uuid.length).toBe(36);
  });
});
