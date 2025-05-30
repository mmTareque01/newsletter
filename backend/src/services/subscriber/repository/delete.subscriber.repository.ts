import { prisma } from "../../../connection";

export const deleteSubscriberRepo = async (id: string) => {
  return await prisma.subscriber.softDelete({
    where: { id },
  });
};
