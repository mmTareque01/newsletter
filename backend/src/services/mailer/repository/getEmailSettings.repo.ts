import { prisma } from "../../../connection"



export const getEmailSettingsRepo = async (userId: string) => {
  return await prisma.emailSettings.findFirst({
    where: { userId },
  });
}