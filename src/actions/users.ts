"use server";

import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { createUser, getUserByEmail } from "@/data-access/users";
import type { User } from "@/app/lib/definitions";

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    try {
      await signIn("credentials", formData);
    } catch (error) {
      if (error instanceof AuthError) {
        console.error("Failed to authenticate user:", error);
        if (error.message === "CredentialsSignin") {
          return "Invalid credentials.";
        } else {
          return "Something went wrong.";
        }
      }
      throw error;
    }
  }
  
  export async function getUser(
    email: string,
    includePassword: boolean = false
  ): Promise<
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    Pick<User, "id" | "name" | "email"> & (typeof includePassword extends true ? { password: string } : {}) | null
  > {
    try {
      const user = getUserByEmail(email, includePassword);
      return user || undefined;
    } catch (error) {
      console.error("Failed to fetch user:", error);
      throw new Error("Failed to fetch user.");
    }
  }
  
  export async function registerUser(
    formData: FormData
  ): Promise<string | null> {
      const name = formData.get("name") as string;
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
  
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        createUser({
          name,
          email,
          password: hashedPassword,
        })
      } catch (prismaError) {
        console.error("Error creating user in Prisma:", prismaError);
        return "Failed to create user.";
      }
  
      return null; // No error
  }