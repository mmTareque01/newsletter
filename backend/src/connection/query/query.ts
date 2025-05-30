import { PrismaClient } from "@prisma/client";
import { create } from "domain";

export const extendedPrisma = (prisma: PrismaClient) => {
  return prisma.$extends({
    model: {
      $allModels: {
        // Pagination method
        async paginate<T, A>(
          this: T,
          options: {
            pageNo?: number;
            pageSize?: number;
            where?: any;
            include?: A extends { include?: infer I } ? I : never;
            orderBy?: A extends { orderBy?: infer O } ? O : never;
                  // select?: A['select'];
          } = {}
        ) {
          const context = this as any;
          const {
            pageNo = 1,
            pageSize = 10,
            where,
            include,
            orderBy = { createdAt: "desc" },
          } = options;
          const skip = (pageNo - 1) * pageSize;

          const [data, total] = await Promise.all([
            context.findMany({
              skip,
              take: pageSize,
              where: { deletedAt: null, ...where },
              include,
              orderBy,
            }),
            context.count({ where: { deletedAt: null, ...where } }),
          ]);

          return {
            data,
            total,
            pageNo,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
          };
        },

        async paginate_x<T, A>(
          this: T,
          options: {
            pageNo?: number;
            pageSize?: number;
            where?: any;
            include?: A extends { include?: infer I } ? I : never;
            orderBy?: A extends { orderBy?: infer O } ? O : never;
            select?: A extends { select?: infer S } ? S : never;
          } = {}
        ) {
          const context = this as any;
          const {
            pageNo = 1,
            pageSize = 10,
            where,
            include,
            orderBy = { createdAt: "desc" },
            select,
          } = options;
          const skip = (pageNo - 1) * pageSize;

          const [data, total] = await Promise.all([
            context.findMany({
              skip,
              take: pageSize,
              where: { deletedAt: null, ...where },
              include,
              orderBy,
              select,
            }),
            context.count({ where: { deletedAt: null, ...where } }),
          ]);

          return {
            data,
            total,
            pageNo,
            pageSize,
            totalPages: Math.ceil(total / pageSize),
          };
        },

        // Soft delete method
        async softDelete<T, A>(
          this: T,
          args: { where: A extends { where?: infer W } ? W : any }
        ) {
          const context = this as any;
          return context.update({
            ...args,
            data: { deletedAt: new Date() },
          });
        },

        // Find all active records (not soft deleted)
        async findManyActive<T, A>(
          this: T,
          args: {
            where?: A extends { where?: infer W } ? W : any;
            include?: A extends { include?: infer I } ? I : never;
            orderBy?: A extends { orderBy?: infer O } ? O : never;
            skip?: number;
            take?: number;
          } = {}
        ) {
          const context = this as any;

          return context.findMany({
            ...args,
            where: {
              ...(args.where || {}),
              deletedAt: null,
            },
          });
        },

        // Find first active record (not soft deleted)
        async findFirstActive<T, A>(
          this: T,
          args: {
            where?: A extends { where?: infer W } ? W : any;
            include?: A extends { include?: infer I } ? I : never;
            orderBy?: A extends { orderBy?: infer O } ? O : never;
          } = {}
        ) {
          const context = this as any;

          return context.findFirst({
            ...args,
            where: {
              ...(args.where || {}),
              deletedAt: null,
            },
          });
        },
      },
    },
  });
};
