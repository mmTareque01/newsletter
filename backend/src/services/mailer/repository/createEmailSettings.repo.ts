import { prisma } from "../../../connection";

export const createEmailSettingsRepo = async (data: {
  userId: string;
  smtpHost: string;
  smtpPort: number;
  smtpUser: string;
  smtpPassword: string;
  fromEmail: string;
  fromName?: string;
  useTLS: boolean;
}) => {
  return await prisma.emailSettings.create({
    data: {
      ...data,
    },
  });
};
