import { prisma } from "../../../../connection";

export const createNewsletterTypeRepo = async (data: {
  title: string;
  description?: string;
  userId: string;
}) => {
  return await prisma.newsletterType.create({
    data,
    select: { title: true, description: true },
  });
};
