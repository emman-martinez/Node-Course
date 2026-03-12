import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import Server from "./presentation/server";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  // const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL });
  // const prisma = new PrismaClient({ adapter });
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: "Hello, Prisma!",
  //     level: "HIGH",
  //     origin: "App.ts",
  //   },
  // });
  // console.log("New log created:", newLog);

  // const logs = await prisma.logModel.findMany({
  //   where: {
  //     level: "MEDIUM",
  //   },
  // });
  // console.log("All logs:", logs);

  // Server.start();
}
