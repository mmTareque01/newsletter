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
    // select:{
    //   id: true,
    // }
    // select:{
    //   id: true,
    //   email: true,
    //   name: true,
    //   status: true,
    //   createdAt: true,
    // }
    // orderBy: { createdAt: 'desc' },
  });
};
