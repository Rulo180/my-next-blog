"use server";

import { revalidatePath } from "next/cache";

import { auth } from "@/auth";
import { createComment, deleteCommentById } from "@/data-access/comments";
import { getPostById } from "@/data-access/posts";


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