import { prisma } from "@/lib/prisma";
import { Post, SavedPost } from "@/generated/prisma";

export async function getPostById(postId: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: { id: postId },
  });
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return await prisma.post.findUnique({
    where: { slug },
  });
}

export async function savePost({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}): Promise<SavedPost> {
  return await prisma.savedPost.create({
    data: {
      userId,
      postId,
    },
  });
}

export async function unsavePost(savedPostId: string): Promise<SavedPost> {
  return await prisma.savedPost.delete({
    where: { id: savedPostId },
  });
}

export async function getPosts(): Promise<(Post & { savedBy: SavedPost[]})[]> {
  return await prisma.post.findMany({
    include: {
      savedBy: true,
    },
  });
}

export async function getSavedPostsByUserId(userId: string): Promise<(SavedPost & { post: Post})[]> {
  return await prisma.savedPost.findMany({
    where: { userId },
    include: { post: true },
  });
}

export async function incrementPostViewCount(postId: string): Promise<Post> {
  return await prisma.post.update({
    where: { id: postId },
    data: { viewCount: { increment: 1 } },
  });
}

export async function getFeaturedPost(): Promise<Post | null> {
  return await prisma.post.findFirst({
    where: { featured: true },
  });
}

export async function findSavedPost({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}): Promise<SavedPost | null> {
  return await prisma.savedPost.findFirst({
    where: {
      userId,
      postId,
    },
  });
}
