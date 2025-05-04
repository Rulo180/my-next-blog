"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/generated/prisma";
import { auth } from "@/auth";
import {
  getSavedPostsByUserId,
  getPosts,
  getFeaturedPost,
  incrementPostViewCount,
  savePost,
  unsavePost,
} from "@/data-access/posts";

export async function savePostAction(postId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated.");
    }

    const userId = session.user.id as string;

    const existingSavedPost = await getSavedPostsByUserId(userId);

    const savedPost = existingSavedPost.find(
      (savedPost) => savedPost.post.id === postId
    );

    if (savedPost) {
      await unsavePost(savedPost.id);
      revalidatePath(`/saved`);
      return { unsaved: true };
    }

    await savePost({
      userId,
      postId,
    });
    revalidatePath(`/saved`);
    return { saved: true };
  } catch (error) {
    console.error("Error in savePostAction:", error);
    throw new Error("Failed to save or unsave the post.");
  }
}

export async function getPostsAction(): Promise<Prisma.PostGetPayload<{ include: { savedBy: true } }>[]> {
  try {
    return await getPosts();
  } catch (error) {
    console.error("Error in getPostsAction:", error);
    throw new Error("Failed to retrieve posts.");
  }
}

export async function getSavedPostsAction(
  userId: string
): Promise<Prisma.SavedPostGetPayload<{ include: { post: true } }>[]> {
  try {
    return await getSavedPostsByUserId(userId);
  } catch (error) {
    console.error("Error in getSavedPostsAction:", error);
    throw new Error("Failed to retrieve saved posts.");
  }
}

export async function addPostVisualization(postId: string) {
  try {
    return await incrementPostViewCount(postId);
  } catch (error) {
    console.error("Error in addPostVisualization:", error);
    throw new Error("Failed to increment post view count.");
  }
}

export async function getFeaturedPostAction(): Promise<Prisma.PostGetPayload<object> | null> {
  try {
    return await getFeaturedPost();
  } catch (error) {
    console.error("Error in getFeaturedPostAction:", error);
    throw new Error("Failed to retrieve featured post.");
  }
}

