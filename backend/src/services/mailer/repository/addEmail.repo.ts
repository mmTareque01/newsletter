import { prisma } from "../../../connection";

export const addEmailRepo = async (data: {
  to: string;
  subject: string;
  body: string;
  userId: string;
  status?: "SENT" | "FAILED" | "PENDING";
}) => {
  return await prisma.invitationEmail.create({
    data: {
      to: data.to,
      subject: data.subject,
      body: data.body,
      userId: data.userId,
      status: data.status || "SENT",
    },
  });
};
