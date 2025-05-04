import { prisma } from "@/lib/prisma";
import { Reaction } from "@/generated/prisma";

export async function toggleReaction({
  userId,
  commentId,
  type,
}: {
  userId: string;
  commentId: string;
  type: "LIKE" | "DISLIKE" | null;
}): Promise<Reaction | null> {
  if (!type) {
    await prisma.reaction.deleteMany({
      where: {
        userId,
        commentId,
      },
    });
    return null;
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