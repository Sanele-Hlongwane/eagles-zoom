// lib/checkUser.ts

import { currentUser } from "@clerk/nextjs/server";
import { db } from '@/lib/prisma';

export const checkUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  let loggedInUser = await db.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  loggedInUser = await db.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
  });

  if (loggedInUser) {
    loggedInUser = await db.user.update({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      data: {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        role: 'default', 
      },
    });

    return loggedInUser;
  }

  const newUser = await db.user.create({
    data: {
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      role: 'default',
    },
  });

  return newUser;
};
