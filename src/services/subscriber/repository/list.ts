import { paginatePrisma, prisma } from "../../../connection";

export const getAllSubscribersRepo = async (
  pageNo: number,
  pageSize: number,
  query?: string
) => {

  return await paginatePrisma.subscriber.paginate({
    pageNo: pageNo,
    pageSize: pageSize,
    where: { status: 'ACTIVE' },
    // orderBy: { createdAt: 'desc' },
  });
};
