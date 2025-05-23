import { prisma } from "../../../../connection";

export const getAllTypesRepo = async (
  userId: string,
  pageNo: number,
  pageSize: number,
  query?: string
) => {
  return await prisma.newsletterType.paginate({
    pageNo: pageNo,
    pageSize: pageSize,
    where: { status: "ACTIVE", userId },
    // orderBy: { createdAt: 'desc' },
  });
};
