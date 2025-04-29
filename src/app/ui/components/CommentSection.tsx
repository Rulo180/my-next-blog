import { Suspense } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";

import { prisma } from "@/lib/prisma";
import CommentList from "@/app/ui/components/CommentList";
import CommentForm from "@/app/ui/components/CommentForm";
import CommentSkeleton from "@/app/ui/components/CommentSkeleton";

interface CommentSectionProps {
  slug: string;
}

const CommentSection: React.FC<CommentSectionProps> = async ({ slug }) => {
  const post = await prisma.post.findUnique({
        where: { slug },
  });
  if (!post) {
    // TODO: Show an alert message
    throw new Error(`Post with slug "${slug}" not found`);
  }
  
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
        <CommentForm postId={post.id} />
      </Stack>
    </Box>
  );
};

export default CommentSection;
