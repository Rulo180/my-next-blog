"use server";

import { revalidatePath } from "next/cache";

import { Post, SavedPost } from "@/generated/prisma";
import { auth } from "@/auth";
import {
  getSavedPostsByUserId,
  getPosts,
  getFeaturedPost,
  incrementPostViewCount,
  savePost,
  unsavePost,
  getPostBySlug,
  findSavedPost,
} from "@/data-access/posts";

export async function savePostAction(postId: string): Promise<{ saved?: boolean; unsaved?: boolean }> {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated.");
    }

    const userId = session.user.id as string;

    const existingSavedPost = await getSavedPostsByUserId(userId);

    const savedPost = existingSavedPost.find(
      (savedPost) => savedPost.postId === postId
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

export async function getPostByslugAction(
  slug: string
): Promise<Post | null> {
  try {
    return await getPostBySlug(slug);
  } catch (error) {
    console.error("Error in getPostByslugAction:", error);
    throw new Error("Failed to retrieve post by slug.");
  }
}

export async function getPostsAction(): Promise<(Post & { savedBy: SavedPost[]})[]> {
  try {
    return await getPosts();
  } catch (error) {
    console.error("Error in getPostsAction:", error);
    throw new Error("Failed to retrieve posts.");
  }
}

export async function getSavedPostsAction(
  userId: string
): Promise<(SavedPost & { post: Post})[]> {
  try {
    return await getSavedPostsByUserId(userId);
  } catch (error) {
    console.error("Error in getSavedPostsAction:", error);
    throw new Error("Failed to retrieve saved posts.");
  }
}

export async function getFeaturedPostAction(): Promise<Post | null> {
  try {
    return await getFeaturedPost();
  } catch (error) {
    console.error("Error in getFeaturedPostAction:", error);
    throw new Error("Failed to retrieve featured post.");
  }
}

export async function getSavedPostStatus(postId: string) {
  try {
    const session = await auth();
    if (!session?.user) {
      throw new Error("User is not authenticated.");
    }

    const userId = session.user.id as string;

    const result = await findSavedPost({
      userId,
      postId,
    })
    return !!result;

  } catch (error) {
    console.error("Error in getSavedPostStatus:", error);
    throw new Error("Failed to retrieve saved post status.");
  }
}

export async function addPostVisualization(postId: string): Promise<Post> {
  try {
    return await incrementPostViewCount(postId);
  } catch (error) {
    console.error("Error in addPostVisualization:", error);
    throw new Error("Failed to increment post view count.");
  }
}
