"use server";

import { revalidatePath } from "next/cache";

import { toggleReaction } from "@/data-access/reactions";

export async function toggleReactionAction(
    userId: string,
    commentId: string,
    type: "LIKE" | "DISLIKE" | null
  ) {
    try {
      await toggleReaction({ userId, commentId, type });
      revalidatePath(`/blog/${commentId}`);
    } catch (error) {
      console.error("Error toggling reaction:", error);
      throw new Error("Failed to toggle reaction.");
    }
  }
  