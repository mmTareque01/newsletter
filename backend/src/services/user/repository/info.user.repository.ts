import { prisma } from "../../../connection";
import { CustomError } from "../../../libs/errors";

export const getUsersInfoRepo = async (data: { id?: string }) => {
  const user = await prisma.user.findUnique({
    where: { id: data.id },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      bio: true,
      image: true,
      social:true,
      address:{
        select:{
          country:true,
          state:true,
          city:true,
          street:true,
          zipCode:true,
        }
      },
    },
  });

  if (!user) {
    throw new CustomError("ER404", "User not found");
  }
  return user;
};
