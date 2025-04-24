'use server';

import { AuthError } from 'next-auth';
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { signIn } from '@/auth';
import type { User } from '@/app/lib/definitions';


export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.message === 'CredentialsSignin') {
        return 'Invalid credentials.';
      } else {
        return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user || undefined;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function registerUser(
  prevState: string | null | undefined,
  formData: FormData
): Promise<string | null> {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return null; // No error
  } catch (error) {
    console.error("Error registering user:", error);
    return "Failed to register user.";
  }
}
