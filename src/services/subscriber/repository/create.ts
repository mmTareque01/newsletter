import { prisma } from "../../../connection";
import { CustomError } from "../../../others/errors";

export const createSubscriberRepo = async (data: {
  email: string;
  name?: string;
  phone?: string;
}) => {
  const existingSubscriber = await prisma.subscriber.findUnique({
    where: { email: data.email },
  });

  if (existingSubscriber) {
    //  response.ER409(res, "Subscriber already exists");
    throw new CustomError('ER409', "Subscriber already exists");
  }
  return await prisma.subscriber.create({ data });
};
