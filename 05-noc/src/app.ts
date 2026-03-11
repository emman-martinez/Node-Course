import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongo";
import LogModel from "./data/mongo/models/log.model";
import Server from "./presentation/server";

(async () => {
  main();
})();

async function main() {
  await MongoDatabase.connect({
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  });

  // Create a collection = tables, document = record
  // const newLog = await LogModel.create({
  //   level: "low",
  //   message: "Test message from Mongo",
  //   origin: "App.ts",
  // });

  // await newLog.save();
  // console.log("New log created:", newLog);

  const logs = await LogModel.find();
  console.log("All logs:", logs);

  // Server.start();
}
