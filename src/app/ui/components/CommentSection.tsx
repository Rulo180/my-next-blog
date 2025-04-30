import { Suspense } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";

import { Post } from "@/app/lib/definitions";
import CommentList from "@/app/ui/components/CommentList";
import CommentForm from "@/app/ui/components/CommentForm";
import CommentSkeleton from "@/app/ui/components/CommentSkeleton";

interface CommentSectionProps {
  post: Post;
}

const CommentSection: React.FC<CommentSectionProps> = async ({ post }) => {
  return (
    <Box w="50%">
      <Heading as="h2" mb={4}>
        Comments
      </Heading>
      <Stack gap={6}>
        <Suspense
          fallback={
            <Stack gap={4}>
              <CommentSkeleton />
              <CommentSkeleton />
            </Stack>
          }
        >
          <CommentList postId={post.id} />
        </Suspense>
        <CommentForm post={post} />
      </Stack>
    </Box>
  );
};

export default CommentSection;
