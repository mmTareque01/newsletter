import { prisma } from "../../../connection";

export const getAllSubscribersRepo = async (
  pageNo: number,
  pageSize: number,
  userId: string,
  newsletterTypeId?: string | null,
  query?: string
) => {
  let where: {
    status: string;
    userId: string;
    newsletterTypeId?: string | null;
  } = { status: "ACTIVE", userId };

  if (newsletterTypeId) {
    where["newsletterTypeId"] = newsletterTypeId;
  }

  return await prisma.subscriber.paginate({
    pageNo: pageNo,
    pageSize: pageSize,
    where,
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
