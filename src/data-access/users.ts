import { prisma } from "@/lib/prisma";
import { User } from "@/generated/prisma";

export async function getUserByEmail(
  email: string,
  includePassword: boolean = false
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: includePassword,
      createdAt: true,
      updatedAt: true,
    },
  });
  return user;
}

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<User> {
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return newUser;
}
