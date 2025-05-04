import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";

export async function getPostById(postId: string) {
  return await prisma.post.findUnique({
    where: { id: postId },
  });
}

export async function savePost({
  userId,
  postId,
}: {
  userId: string;
  postId: string;
}) {
  return await prisma.savedPost.create({
    data: {
      userId,
      postId,
    },
  });
}

export async function unsavePost(savedPostId: string) {
  return await prisma.savedPost.delete({
    where: { id: savedPostId },
  });
}

export async function getPosts(): Promise<Prisma.PostGetPayload<{ include: { savedBy: true } }>[]> {
  return await prisma.post.findMany({
    include: {
      savedBy: true,
    },
  });
}

export async function getSavedPostsByUserId(userId: string) {
  return await prisma.savedPost.findMany({
    where: { userId },
    include: { post: true },
  });
}

export async function incrementPostViewCount(postId: string) {
  return await prisma.post.update({
    where: { id: postId },
    data: { viewCount: { increment: 1 } },
  });
}

export async function getFeaturedPost(): Promise<Prisma.PostGetPayload<object> | null> {
  return await prisma.post.findFirst({
    where: { featured: true },
  });
}
