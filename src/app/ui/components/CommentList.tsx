import { Box, EmptyState, Stack, StackSeparator } from "@chakra-ui/react";
import { FaCommentDots } from "react-icons/fa6";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Comment from "@/app/ui/components/Comment";

const CommentList: React.FC<{ slug: string }> = async ({ slug }) => {
  const comments = await prisma.comment.findMany({
    where: {
      postId: slug,
    },
    include: {
      user: true,
    },
  });

  const session = await auth();

  return (
    <Box>
      {comments.length === 0 && (
        <EmptyState.Root size="sm">
          <EmptyState.Content>
            <EmptyState.Indicator>
              <FaCommentDots />
            </EmptyState.Indicator>
            <Stack gap={2} textAlign="center">
              <EmptyState.Title>Be the first to comment</EmptyState.Title>
              <EmptyState.Description>
                Share your thoughts with the community.
              </EmptyState.Description>
            </Stack>
          </EmptyState.Content>
        </EmptyState.Root>
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
