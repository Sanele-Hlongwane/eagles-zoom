import { currentUser } from "@clerk/nextjs/server";
import { prisma } from '@/lib/prisma';

export const checkUser = async () => {
  const user = await currentUser();

  // Check current login user
  if (!user) {
    return null;
  }

  // Check if user is in prisma by Clerk ID
  let loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  // If user is in prisma by Clerk ID
  if (loggedInUser) {
    return loggedInUser;
  }

  // Check if user is in prisma by email
  loggedInUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  // If user is in prisma by email, update Clerk ID and other details
  if (loggedInUser) {
    loggedInUser = await prisma.user.update({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      data: {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
      },
    });

    return loggedInUser;
  }

  // If user is not in prisma, create a new user
  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
    },
  });

  return newUser;
};
