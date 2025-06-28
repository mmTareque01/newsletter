import { prisma } from "../../../connection";

export const getAllTypesRepo = async (
  userId: string,
  pageNo: number,
  pageSize: number,
  select?: {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    status?: boolean;
    userId?: boolean;
  },
  query?: string
) => {
  let queryCondition: any = {
    pageNo: pageNo,
    pageSize: pageSize,
    where: { status: "ACTIVE", userId },
    // select:true
    // orderBy: { createdAt: 'desc' },
  };

  if (select && Object.keys(select).length > 0) {
    queryCondition["select"] = select;
  }
  return await prisma.newsletterType.paginate(queryCondition);
};
