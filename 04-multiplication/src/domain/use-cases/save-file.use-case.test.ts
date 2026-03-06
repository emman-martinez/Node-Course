import * as fs from "node:fs";
import { SaveFile } from "./save-file.use-case";

describe("SaveFileUseCase", () => {
  beforeEach(() => {
    // Clean up the outputs directory before each test
    const outFolderExists = fs.existsSync("outputs");
    const customOutFolderExists = fs.existsSync("custom-outputs");

    if (outFolderExists) {
      fs.rmSync("outputs", { recursive: true, force: true });
    }

    if (customOutFolderExists) {
      fs.rmSync("custom-outputs", { recursive: true, force: true });
    }
  });

  afterEach(() => {
    // Clean up the outputs directory after each test
    const outFolderExists = fs.existsSync("outputs");
    const customOutFolderExists = fs.existsSync("custom-outputs");

    if (outFolderExists) {
      fs.rmSync("outputs", { recursive: true, force: true });
    }

    if (customOutFolderExists) {
      fs.rmSync("custom-outputs", { recursive: true, force: true });
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

  test("should save file with custom values", () => {
    const options = {
      fileContent: "Custom Content",
      fileDestination: "custom-outputs/file-destination",
      fileName: "custom-table-name",
    };
    const saveFile = new SaveFile();
    const filePath = `${options.fileDestination}/${options.fileName}.txt`;
    const result = saveFile.execute(options);
    const fileExists = fs.existsSync(filePath);
    const fileContent = fs.readFileSync(filePath, { encoding: "utf-8" });

    expect(result).toBe(true);
    expect(fileExists).toBe(true);
    expect(fileContent).toBe(options.fileContent);
  });

  test("should return false if directory could not be created", () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, "mkdirSync").mockImplementation(() => {
      throw new Error("Failed to create directory");
    });

    const result = saveFile.execute({ fileContent: "Test content" });

    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });

  test("should return false if file could not be created", () => {
    const saveFile = new SaveFile();
    const writeFileSpy = jest
      .spyOn(fs, "writeFileSync")
      .mockImplementation(() => {
        throw new Error("Failed to write file");
      });
    const result = saveFile.execute({ fileContent: "Test content" });

    expect(result).toBe(false);
    writeFileSpy.mockRestore();
  });
});
