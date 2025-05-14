import { PrismaClient } from "@prisma/client";
import { paginate } from "./query/paginate.query";
 let prismaBase = new PrismaClient();
// export const paginatePrisma = new PrismaClient().$extends(paginate);
export const  prisma = paginate(prismaBase);