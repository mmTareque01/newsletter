import { PrismaClient } from "@prisma/client";

export const paginate = (prisma: PrismaClient) => {
  return prisma.$extends({
    model: {
      $allModels: {
        async paginate<T, A>(
          this: T,
          options: {
            pageNo?: number;
            pageSize?: number;
            where?: any;
            include?: A extends { include?: infer I } ? I : never;
            orderBy?: A extends { orderBy?: infer O } ? O : never;
          } = {}
        ) {
          const context = this as any;
          const {
            pageNo = 1,
            pageSize = 10,
            where,
            include,
            orderBy,
          } = options;
          const skip = (pageNo - 1) * pageSize;

          const [data, total] = await Promise.all([
            context.findMany({
              skip,
              take: pageSize,
              where,
              include,
              orderBy,
            }),
            context.count({ where }),
          ]);

          return {
            data,
            total,
            pageNo,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
          };
        },
      },
    },
  });
};
