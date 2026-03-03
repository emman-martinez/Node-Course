import * as fs from "node:fs";

export interface SaveFileUseCase {
  execute: (options: Options) => boolean;
}

export interface Options {
  fileContent: string;
  fileDestination?: string;
  fileName?: string;
}

export class SaveFile implements SaveFileUseCase {
  constructor /* DI: Dependency Injection */() {}

  execute({
    fileContent,
    fileDestination = "outputs",
    fileName = "table",
  }: Options): boolean {
    try {
      fs.mkdirSync(fileDestination, { recursive: true });
      fs.writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent);

      return true;
    } catch (error) {
      console.error("Error saving file:", error);
      return false;
    }
  }
}
