import { Suspense } from "react";
import { Box, Heading, Stack } from "@chakra-ui/react";

import CommentList from "@/app/ui/components/CommentList";
import CommentForm from "@/app/ui/components/CommentForm";
import CommentSkeleton from "@/app/ui/components/CommentSkeleton";

interface CommentSectionProps {
  slug: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ slug }) => {
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
          <CommentList slug={slug} />
        </Suspense>
        <CommentForm postId={slug} />
      </Stack>
    </Box>
  );
};

export default CommentSection;
