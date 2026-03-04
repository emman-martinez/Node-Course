import * as fs from "node:fs";
import { SaveFile } from "./save-file.use-case";

describe("SaveFileUseCase", () => {
  beforeEach(() => {
    // Clean up the outputs directory before each test
    if (fs.existsSync("outputs")) {
      fs.rmSync("outputs", { recursive: true, force: true });
    }
  });

  afterEach(() => {
    // Clean up the outputs directory after each test
    if (fs.existsSync("outputs")) {
      fs.rmSync("outputs", { recursive: true, force: true });
    }
  });

  test("should save file with default values", () => {
    const saveFile = new SaveFile();
    const filePath = "outputs/table.txt";
    const options = {
      fileContent: "Hello, World!",
    };

    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });
});
