import { PrismaClient } from "@prisma/client";

const db = new PrismaClient({ log: ["info", "error", "warn"] });

export default db;
