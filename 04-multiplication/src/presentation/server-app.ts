import { Arguments } from "yargs";
import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

export interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
}

export class ServerApp {
  static run({ base, limit, showTable }: RunOptions) {
    console.log("ServerApp is running...");

    const table = new CreateTable().execute({ base, limit });
    const wasCreated = new SaveFile().execute({
      fileContent: table,
      fileDestination: "outputs",
      fileName: `table-${base}`,
    });

    if (showTable) console.log(table);

    wasCreated
      ? console.log(
          `File "table-${base}.txt" has been created in the "outputs" directory.`,
        )
      : console.log("Failed to create file.");
  }
}
