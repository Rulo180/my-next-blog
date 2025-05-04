import { Box, Card, Flex, Image, Text } from "@chakra-ui/react";
import Link from "next/link";

interface FeaturedPostProps {
  date: Date;
  readingTime: number;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

/**
 * A React functional component that displays a featured blog post card with details such as
 * date, reading time, title, description, image, and view count.
 *
 * @component
 * @param {string} props.postId - The unique identifier for the blog post.
 * @param {string} props.date - The publication date of the post.
 * @param {string} props.readingTime - The estimated reading time of the post in minutes.
 * @param {string} props.title - The title of the blog post.
 * @param {string} props.description - A brief description or excerpt of the blog post.
 * @param {string} props.imageUrl - The URL of the image associated with the blog post.
 * @param {number} props.viewCount - The number of views the blog post has received.
 * @param {string} props.url - The URL to navigate to when the card is clicked.
 *
 * @returns {JSX.Element} A styled card component displaying the featured blog post details.
 */
const FeaturedPost: React.FC<FeaturedPostProps> = ({
  date,
  readingTime,
  title,
  description,
  imageUrl,
  url,
}) => {
  const fontSize = "1rem";
  const lineHeight = "1.5";

  // Calculate height for two lines in rem
  const twoLineHeight = `calc(${fontSize} * ${lineHeight} * 2)`;

  return (
    <Link href={url} passHref>
      <Box position="relative" maxW="4xl" margin="auto">
        <Text
          position="absolute"
          top="-20px"
          bg="white"
          border="1px solid black"
          px={8}
          py={2}
          fontSize="xl"
          zIndex={1}
          letterSpacing="6px"
        >
          FEATURED POST
        </Text>
        <Card.Root
          overflow="hidden"
          borderRadius={0}
          backgroundColor="white"
          color="black"
        >
          <Image
            objectFit="cover"
            width="940px"
            height="400px"
            src={imageUrl}
            alt="Post image"
          />
          <Box p={4}>
            <Card.Header>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex gap={2} fontSize="xs" color="gray.500">
                  <Text>{new Date(date).toLocaleDateString("es-AR")}</Text>-
                  <Text>{readingTime} mins</Text>
                </Flex>
              </Flex>
            </Card.Header>
            <Card.Body>
              <Card.Title lineClamp="1" mb="2" fontSize="2xl">
                {title}
              </Card.Title>
              <Card.Description
                height={twoLineHeight}
                lineClamp="2"
                color="black"
              >
                {description}
              </Card.Description>
            </Card.Body>
          </Box>
        </Card.Root>
      </Box>
    </Link>
  );
};

export default FeaturedPost;
