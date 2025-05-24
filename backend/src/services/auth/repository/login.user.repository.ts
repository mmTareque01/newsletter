import { prisma } from "../../../connection";
import { CustomError } from "../../../libs/errors";
import { comparePassword } from "../../../libs/hash";

export const loginRepo = async (data: {
  email: string;
  password: string;
}): Promise<UserType> => {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
    // select:{
    //   email:
    // }
  });
  const invalidError = new CustomError("ER409", "Invalid credentials");
  if (!existingUser) {
    throw invalidError;
  }
  const isMatched = await comparePassword(
    data.password,
    existingUser?.password || ""
  );

  if (!isMatched) throw invalidError;

  return {
    id: existingUser.id,
    email: existingUser.email,
    firstName: existingUser.firstName || "",
    lastName: existingUser.lastName || "",
  };
};
