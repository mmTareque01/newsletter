import { prisma } from "../../../connection";
import { CustomError } from "../../../libs/errors";

export const updateUsersInfoRepo = async (data: {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  bio?: string;
  social?: any;
  address?: any;
}) => {
  const user = await prisma.user.update({
    where: { id: data.id },
    data: {
      ...(data.firstName && { firstName: data.firstName }),
      ...(data.lastName && { lastName: data.lastName }),
      ...(data.email && { email: data.email }),
      ...(data.phone && { phone: data.phone }),
      ...(data.bio && { bio: data.bio }),
      ...(data.social && { social: data.social }),
      // ...(data.address && { address: data.address }),
      ...(data.address && {
        address: {
          upsert: {
            create: {
              street: data.address.street,
              city: data.address.city,
              state: data.address.state,
              zipCode: data.address.zipCode,
              country: data.address.country,
            },
            update: {
              street: data.address.street,
              city: data.address.city,
              state: data.address.state,
              zipCode: data.address.zipCode,
              country: data.address.country,
            },
          },
        },
      }),
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      bio: true,
      image: true,
      social: true,
      address: true,
    },
  });

  return user;
};
