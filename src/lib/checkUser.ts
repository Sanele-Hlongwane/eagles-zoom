import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const checkUser = async (selectedRole: string | null) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  let loggedInUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      role: true, // Include the role in the query
    },
  });

  if (loggedInUser) {
    return loggedInUser;
  }

  loggedInUser = await prisma.user.findUnique({
    where: {
      email: user.emailAddresses[0].emailAddress,
    },
    include: {
      role: true, // Include the role in the query
    },
  });

  if (loggedInUser) {
    loggedInUser = await prisma.user.update({
      where: {
        email: user.emailAddresses[0].emailAddress,
      },
      data: {
        clerkId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: user.imageUrl,
        role: {
          connect: { id: selectedRole || 'defaultRoleId' }, // Connect to selected role or default role ID
        },
      },
      include: {
        role: true, // Include the role in the query
      },
    });

    return loggedInUser;
  }

  // Attempt to find the default role
  let defaultRole = await prisma.role.findUnique({
    where: {
      name: 'default',
    },
  });

  // If default role doesn't exist, create it
  if (!defaultRole) {
    defaultRole = await prisma.role.create({
      data: {
        name: 'default',
      },
    });
  }

  const newUser = await prisma.user.create({
    data: {
      clerkId: user.id,
      name: `${user.firstName} ${user.lastName}`,
      imageUrl: user.imageUrl,
      email: user.emailAddresses[0].emailAddress,
      role: {
        connect: { id: selectedRole || defaultRole.id }, // Connect to selected role or default role ID
      },
    },
    include: {
      role: true, // Include the role in the query
    },
  });

  return newUser;
};
