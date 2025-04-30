"use server";

import bcrypt from "bcrypt";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

import { Prisma } from "@/generated/prisma";
import { auth, signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import type { User } from "@/app/lib/definitions";

// Users
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
  formData: FormData
): Promise<string | null> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
    } catch (prismaError) {
      console.error("Error creating user in Prisma:", prismaError);
      return "Failed to create user.";
    }

    return null; // No error
}

// Comments
export async function saveComment(
  prevState: string | null | undefined,
  formData: FormData
) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated.");
    }

    const user = session.user as User;

    const content = formData.get("content") as string;
    const postId = formData.get("postId") as string;
    
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });
    if (!post) {
      throw new Error("Post not found");
    }

    if (!content || content.trim() === "") {
      return "Comment cannot be empty.";
    }

    await prisma.comment.create({
      data: {
        content,
        postId: post.id,
        userId: user?.id,
      },
    });

    revalidatePath(`/posts/${post.slug}`);

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

export async function savePost(postId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated.");
    }

    const userId = session.user.id as string;

    const existingSavedPost = await prisma.savedPost.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingSavedPost) {
      await prisma.savedPost.delete({
        where: {
          id: existingSavedPost.id,
        },
      });
      revalidatePath(`/saved`);
      return { unsaved: true };
    }

    await prisma.savedPost.create({
      data: {
        userId,
        postId,
      },
    });
    revalidatePath(`/saved`);
    return { saved: true };
  } catch (error) {
    console.error("Error in savePost:", error);
    throw new Error("Failed to save or unsave the post.");
  }
}

export async function getSavedPosts(
  userId: string
): Promise<Prisma.SavedPostGetPayload<{ include: { post: true } }>[]> {
  try {
    return await prisma.savedPost.findMany({
      where: { userId },
      include: { post: true },
    });
  } catch (error) {
    console.error("Error in getSavedPosts:", error);
    throw new Error("Failed to retrieve saved posts.");
  }
}
