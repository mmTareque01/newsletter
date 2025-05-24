// import { PrismaClient } from "@prisma/client";
// import { paginate } from "./query/paginate.query";
// import { softDelete } from "./query/delete.query";
// let prismaBase = new PrismaClient();
// export const prisma = paginate(prismaBase);




import { PrismaClient } from "@prisma/client";
import { paginate } from "./query/paginate.query";
import { softDelete } from "./query/delete.query";
import { extendedPrisma } from "./query/query";

const base = new PrismaClient();

// TypeScript-safe chaining with `unknown` cast
// const withSoftDelete = softDelete(base) as unknown as PrismaClient;
// const withPaginate = paginate(withSoftDelete);

export const prisma = extendedPrisma(base);


