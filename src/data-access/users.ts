import { prisma } from "@/lib/prisma";

export async function getUserByEmail(
  email: string,
  includePassword: boolean = false
) {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: includePassword,
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
}) {
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  return newUser;
}
