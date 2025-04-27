import { Box, Heading, Stack } from "@chakra-ui/react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

interface CommentSectionProps {
  slug: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ slug }) => {
  return (
    <Box w="50%">
      <Heading as="h2" mb={4}>
        Comments
      </Heading>
      <Stack gap={6} >
        <CommentList slug={ slug } />
        <CommentForm postId={slug} />
      </Stack>
    </Box>
  );
};

export default CommentSection;
