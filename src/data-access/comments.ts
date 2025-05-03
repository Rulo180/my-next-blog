import { prisma } from "@/lib/prisma";

export async function getCommentsByPostId(postId: string) {
  return await prisma.comment.findMany({
    where: { postId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

export async function createComment({
  content,
  postId,
  userId,
}: {
  content: string;
  postId: string;
  userId: string;
}) {
  return await prisma.comment.create({
    data: {
      content,
      postId,
      userId,
    },
  });
}

export async function deleteCommentById(commentId: string) {
  return await prisma.comment.delete({
    where: { id: commentId },
  });
}

export async function updateComment({
  commentId,
  content,
}: {
  commentId: string;
  content: string;
}) {
  return await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });
}