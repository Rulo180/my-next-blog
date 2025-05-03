import { prisma } from "@/lib/prisma";

export async function toggleReaction({
  userId,
  commentId,
  type,
}: {
  userId: string;
  commentId: string;
  type: "LIKE" | "DISLIKE" | null;
}) {
  if (!type) {
    return await prisma.reaction.deleteMany({
      where: {
        userId,
        commentId,
      },
    });
  }

  return await prisma.reaction.upsert({
    where: {
      userId_commentId: {
        userId,
        commentId,
      },
    },
    update: {
      type,
    },
    create: {
      userId,
      commentId,
      type,
    },
  });
}