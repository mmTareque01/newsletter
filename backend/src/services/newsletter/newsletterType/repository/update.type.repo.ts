import { prisma } from "../../../../connection";

export const updateTypesRepo = async (
  id: string, // unique id of the newsletterType
  data: {
    title: string;
    description: string;
  }
) => {
  return await prisma.newsletterType.update({
    where: { id },
    data,
  });
};

