import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
} from "@chakra-ui/react";

const CommentSkeleton: React.FC = () => {
  return (
    <Stack gap="6" maxW="sm">
      <Stack direction="row" width="full">
        <SkeletonCircle size="10" />
        <SkeletonText noOfLines={2} />
      </Stack>
      <Skeleton height="150px" />
    </Stack>
  );
};

export default CommentSkeleton;
