import { prisma } from "../../../connection";
import { CustomError } from "../../../libs/errors";
// import { UserType } from "../../../others/type";

export const createUserRepo = async (data: {
  email: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}): Promise<UserType> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new CustomError("ER409", "User already exists");
  }
  return await prisma.user.create({
    data,
    select: { email: true, firstName: true, lastName: true, id: true },
  });
};
