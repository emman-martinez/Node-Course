import { Arguments } from "yargs";

export interface RunOptions {
  base: number;
  limit: number;
  show: boolean;
}

export class ServerApp {
  static run(options: RunOptions) {
    console.log("ServerApp is running...");
    console.log({ options });
  }
}
