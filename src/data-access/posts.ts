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

export async function getSavedPostsByUserId(userId: string) {
  return await prisma.savedPost.findMany({
    where: { userId },
    include: { post: true },
  });
}