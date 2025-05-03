import { Box, Stack, StackSeparator } from "@chakra-ui/react";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Comment from "@/app/ui/components/Comment";
import { EmptyState } from "@/app/ui/components/EmptyState";
import { FaCommentDots } from "react-icons/fa6";

const CommentList: React.FC<{ postId: string }> = async ({ postId }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: true,
      reactions: true
    },
  });

  const session = await auth();

  return (
    <Box>
      {comments.length === 0 && (
        <EmptyState
          title="Be the first to comment"
          description="Share your thoughts with the community."
          icon={<FaCommentDots />}
        />
      )}
      <Stack gap={4} separator={<StackSeparator />}>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            comment={comment}
            isOwner={
              session?.user ? session.user.email === comment.user.email : false
            }
            owner={comment.user}
          />
        ))}
      </Stack>
    </Box>
  );
};

export default CommentList;
