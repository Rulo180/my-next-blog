"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@/generated/prisma";
import { auth } from "@/auth";
import { createComment, deleteCommentById, getCommentCountByPostId, getCommentsByPostId } from "@/data-access/comments";
import { getPostById } from "@/data-access/posts";

export async function getCommentsByPostIdAction(
  postId: string,
  include: Prisma.CommentInclude
): Promise<Prisma.CommentGetPayload<{ include: typeof include }>[]> {
  try {
    const {user, ...rest} = include;
    if (user) {
      return await getCommentsByPostId(postId, {
        user: { select: { id: true, name: true, email: true } },
        ...rest,
      });
    }
    return await getCommentsByPostId(postId, include);
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw new Error("Failed to fetch comments.");
  }
}

export async function getCommentCountByPostIdAction(postId: string): Promise<number> {
  try {
    return await getCommentCountByPostId(postId);
  } catch (error) {
    console.error("Error fetching comment count:", error);
    throw new Error("Failed to fetch comment count.");
  }
}

export async function saveComment(
    prevState: string | null | undefined,
    formData: FormData
  ) {
    try {
      const session = await auth();
      if (!session?.user) {
        throw new Error("User is not authenticated.");
      }
  
      const user = session.user;
  
      const content = formData.get("content") as string;
      const postId = formData.get("postId") as string;
      
      const post = await getPostById(postId);
      if (!post) {
        throw new Error("Post not found");
      }
  
      if (!content || content.trim() === "") {
        return "Comment cannot be empty.";
      }
  
      await createComment({
        content,
        postId: post.id,
        userId: user.id as string,
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
  
      await deleteCommentById(commentId);
  
      revalidatePath(`/posts/${formData.get("postId")}`);
  
      return null; // No error
    } catch (error) {
      console.error("Error deleting comment:", error);
      return "Failed to delete comment.";
    }
  }