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
    const fontSize = "1rem";
    const lineHeight = "1.5";
  
  // Calculate height for two lines in rem
  const twoLineHeight = `calc(${fontSize} * ${lineHeight} * 2)`;

  return (
    <Card.Root flexDirection="row" overflow="hidden" maxW="xl" borderRadius={0} backgroundColor="white" color="black">
      <Image
        objectFit="cover"
        maxW="200px"
        src={imageUrl}
        alt="Caffe Latte"   // TODO: use image alt text
      />
      <Box w="full">
        <Card.Header>
          <Flex gap={2} fontSize="xs" color="gray.500">
            <Text>{date}</Text>
            -
            <Text>{readingTime} minutes</Text>
          </Flex>
        </Card.Header>
        <Card.Body>
          <Card.Title mb="2" fontSize="2xl">{title}</Card.Title>
          <Card.Description height={twoLineHeight} lineClamp="2" color="black">{description}</Card.Description>
        </Card.Body>
        <Separator my={2} mx={6} />
        <Card.Footer>
            <Flex gap="2">
                <Text fontSize="xs" color="gray.500">{viewCount} views</Text>
                <Text fontSize="xs" color="gray.500">{commentCount} comments</Text>
            </Flex>
        </Card.Footer>
      </Box>
    </Card.Root>
  );
};

export default PostCard;
