import { prisma } from "@/lib/prisma";
import { Prisma, Comment } from "@/generated/prisma";

export async function createComment({
  content,
  postId,
  userId,
}: {
  content: string;
  postId: string;
  userId: string;
}): Promise<Comment> {
  return await prisma.comment.create({
    data: {
      content,
      postId,
      userId,
    },
  });
}

export async function getCommentsByPostId(
  postId: string,
  include: Prisma.CommentInclude = { user: { select: { id: true, name: true, email: true } } }
): Promise<Prisma.CommentGetPayload<{ include: typeof include }>[]> {
  return await prisma.comment.findMany({
    where: { postId },
    include,
  });
}

export async function getCommentCountByPostId(postId: string): Promise<number> {
  const count = await prisma.comment.count({
    where: { postId },
  });
  return count;
}

export async function deleteCommentById(commentId: string): Promise<Comment> {
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
}): Promise<Comment> {
  return await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });
}
