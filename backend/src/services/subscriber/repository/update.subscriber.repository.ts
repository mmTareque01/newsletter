import { prisma } from "../../../connection";

export const updateSubscriberRepo = async (
  id: string, // unique id of the newsletterType
  data: {
    status: "ACTIVE" | "INACTIVE" | "UNSUBSCRIBED"// | "BLOCKED";
    // description: string;
  }
) => {
  return await prisma.subscriber.update({
    where: { id },
    data,
    select: {
      email: true,
      name: true,
      status: true,
    },
  });
};
