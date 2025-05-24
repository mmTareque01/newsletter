import { PrismaClient } from "@prisma/client";

export const softDelete_x = (prisma: PrismaClient) => {
  return prisma.$extends({
    model: {
      $allModels: {
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
// import { PrismaClient } from "@prisma/client";

export const softDelete = (prisma: PrismaClient) => {
  return prisma.$extends({
    model: {
      $allModels: {
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

        // Optional: Keep your existing "active" finders
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



// softDelete.ts

