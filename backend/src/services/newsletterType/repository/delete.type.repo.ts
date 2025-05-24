import { prisma } from "../../../connection";

export const deleteTypeRepo = async (id: string) => {
  return await prisma.newsletterType.softDelete({
    where: { id },
    // selcect: {
    //   id: true,
    // }
  });
};
