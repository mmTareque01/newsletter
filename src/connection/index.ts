import { PrismaClient } from "@prisma/client";
import { paginate } from "./query/paginate.query";
export const prisma = new PrismaClient();
// export const paginatePrisma = new PrismaClient().$extends(paginate);
export const paginatePrisma = paginate(prisma);