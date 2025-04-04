import {
  Box,
  Card,
  Flex,
  Image,
  Separator,
  Text,
} from "@chakra-ui/react";

interface PostCardProps {
  date: string;
  readingTime: string;
  title: string;
  description: string;
  imageUrl: string;
  viewCount: number;
  commentCount: number;
}

const PostCard: React.FC<PostCardProps> = ({
  date,
  readingTime,
  title,
  description,
  imageUrl,
  viewCount,
  commentCount,
}) => {
  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl">
      <Image
        objectFit="cover"
        maxW="200px"
        src={imageUrl}
        alt="Caffe Latte"   // TODO: use image alt text
      />
      <Box>
        <Card.Header>
          <Flex gap={2}>
            <Text>{date}</Text>
            -
            <Text>{readingTime} minutes</Text>
          </Flex>
        </Card.Header>
        <Card.Body>
          <Card.Title mb="2">{title}</Card.Title>
          <Card.Description lineClamp="3">{description}</Card.Description>
        </Card.Body>
        <Separator my={2} />
        <Card.Footer>
            <Flex gap="2">
                <Text>{viewCount} views</Text>
                <Text>{commentCount} comments</Text>
            </Flex>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
};

export default PostCard;
