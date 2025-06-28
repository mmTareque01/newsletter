import { prisma } from "../../../connection";
import { CustomError } from "../../../libs/errors";

interface SubscriberData {
  email: string;
  name?: string;
  phone?: string;
  newsletterTypeId: string;
  userId: string;
}



// Alternative version that skips existing subscribers instead of throwing error
export const createManySubscribersRepo = async (subscribersData: SubscriberData[]) => {
  // Get existing emails
  const existingEmails = await prisma.subscriber.findMany({
    where: {
      email: {
        in: subscribersData.map(s => s.email)
      }
    },
    select: {
      email: true
    }
  });

  const existingEmailSet = new Set(existingEmails.map(e => e.email));
  const subscribersToCreate = subscribersData.filter(
    s => !existingEmailSet.has(s.email)
  );

  if (subscribersToCreate.length === 0) {
    return [];
  }

  return await prisma.$transaction(
    subscribersToCreate.map(data => 
      prisma.subscriber.create({ data })
    )
  );
};