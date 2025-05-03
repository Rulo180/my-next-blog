"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/generated/prisma";
import { auth } from "@/auth";
import { savePost, unsavePost, getSavedPostsByUserId } from "@/data-access/posts";

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