import { Arguments } from "yargs";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

export interface RunOptions {
  base: number;
  destination: string;
  limit: number;
  name: string;
  showTable: boolean;
}

export class ServerApp {
  static run({ base, destination, limit, name, showTable }: RunOptions) {
    console.log("ServerApp is running...");

    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileDestination: destination,
      fileName: name,
    });

    if (showTable) console.log(table);

    wasCreated
      ? console.log(
          `File "${name}.txt" has been created in the "${destination}" directory.`,
        )
      : console.log("Failed to create file.");
  }
}
