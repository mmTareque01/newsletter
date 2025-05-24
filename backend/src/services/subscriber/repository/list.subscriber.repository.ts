import { prisma } from "../../../connection";

export const getAllSubscribersRepo = async (
  pageNo: number,
  pageSize: number,
  userId: string,
  query?: string
) => {
  return await prisma.subscriber.paginate({
    pageNo: pageNo,
    pageSize: pageSize,
    where: { status: "ACTIVE", userId },
    // orderBy: { createdAt: 'desc' },
  });
};
