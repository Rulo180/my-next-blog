"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";
import { auth, signIn } from "@/auth";
import type { User } from "@/app/lib/definitions";
import { revalidatePath } from "next/cache";

// Users
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
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
  Pick<User, "id" | "name" | "email"> & (typeof includePassword extends true ? { password: string } : {}) | undefined
> {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        password: includePassword,
      },
    });
    return user || undefined;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
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
    });

    return null; // No error
  } catch (error) {
    console.error("Error registering user:", error);
    return "Failed to register user.";
  }
}

// Comments
export async function saveComment(
  prevState: string | null | undefined,
  formData: FormData
) {
  try {
    const session = await auth();
    const email = session?.user?.email;

    const user = await getUser(email as string);

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const content = formData.get("content") as string;
    const postId = formData.get("postId") as string;

    if (!content || content.trim() === "") {
      return "Comment cannot be empty.";
    }

    await prisma.comment.create({
      data: {
        content,
        postId,
        userId: user?.id,
      },
    });

    revalidatePath(`/posts/${postId}`);

    return null; // No error
  } catch (error) {
    console.error("Error creating comment:", error);
    return "Failed to create comment.";
  }
}

export async function deleteComment(
  prevState: string | null | undefined,
  formData: FormData
) {
  try {
    const commentId = formData.get("commentId") as string;

    await prisma.comment.delete({
      where: { id: commentId },
    });

    revalidatePath(`/posts/${formData.get("postId")}`);

    return null; // No error
  } catch (error) {
    console.error("Error deleting comment:", error);
    return "Failed to delete comment.";
  }
}
