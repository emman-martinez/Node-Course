import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, SeverityLevel } from "./../../generated/prisma/client";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { envs } from "../../config/plugins/envs.plugin";

const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL });
const prismaClient = new PrismaClient({ adapter });

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresLogDataSource implements LogDataSource {
  async saveLog(log: LogEntity): Promise<void> {
    const level = severityEnum[log.level];
    const newLog = await prismaClient.logModel.create({
      data: { ...log, level },
    });

    console.log("Postgres Log saved:", newLog.id);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const level = severityEnum[severityLevel];
    const logs = await prismaClient.logModel.findMany({
      where: {
        level,
      },
    });
    const logsEntities = logs.map(LogEntity.fromObject);

    return logsEntities;
  }
}
