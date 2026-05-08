import { PrismaPg } from "@prisma/adapter-pg";
import { envs } from "../../config/envs";

const adapter = new PrismaPg({ connectionString: envs.POSTGRES_URL });
const { PrismaClient } = require("@prisma/client") as typeof import("@prisma/client");

const prismaClient = new PrismaClient({ adapter });

export default prismaClient;
