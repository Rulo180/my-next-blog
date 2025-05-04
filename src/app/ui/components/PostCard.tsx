import { Box, Card, Flex, Image, Separator, Text } from "@chakra-ui/react";
import Link from "next/link";

import { auth } from "@/auth";
import SaveButton from "@/app/ui/components/SaveButton";
import FadeInUp from "@/app/ui/components/FadeInUp";
import { getCommentCountByPostIdAction } from "@/actions/comments";

interface PostCardProps {
  postId: string;
  date: Date;
  readingTime: number;
  title: string;
  description: string;
  imageUrl: string;
  viewCount?: number;
  isSaved: boolean;
  url: string;
}

/**
 * A React functional component that displays a blog post card with details such as
 * date, reading time, title, description, image, view count, and comment count.
 *
 * @component
 * @param {string} props.postId - The unique identifier for the blog post.
 * @param {string} props.date - The publication date of the post.
 * @param {string} props.readingTime - The estimated reading time of the post in minutes.
 * @param {string} props.title - The title of the blog post.
 * @param {string} props.description - A brief description or excerpt of the blog post.
 * @param {string} props.imageUrl - The URL of the image associated with the blog post.
 * @param {number} props.viewCount - The number of views the blog post has received.
 * @param {boolean} props.isSaved - Indicates whether the post is saved by the user.
 * @param {string} props.url - The URL to navigate to when the card is clicked.
 *
 * @returns {JSX.Element} A styled card component displaying the blog post details.
 */
const PostCard: React.FC<PostCardProps> = async ({
  postId,
  date,
  readingTime,
  title,
  description,
  imageUrl,
  viewCount = 0,
  isSaved,
  url,
}) => {
  const session = await auth();
  const fontSize = "1rem";
  const lineHeight = "1.5";

  const commentCount = getCommentCountByPostIdAction(postId)

  // Calculate height for two lines in rem
  const twoLineHeight = `calc(${fontSize} * ${lineHeight} * 2)`;

  return (
    <Link href={url} passHref>
      <FadeInUp>
        <Card.Root
          flexDirection="row"
          overflow="hidden"
          maxW="xl"
          borderRadius={0}
          backgroundColor="white"
          color="black"
        >
          <Image objectFit="cover" maxW="200px" src={imageUrl} alt="Post image" />
          <Box w="full">
            <Card.Header>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex gap={2} fontSize="xs" color="gray.500">
                  <Text>{new Date(date).toLocaleDateString("es-AR")}</Text>-
                  <Text>{readingTime} mins</Text>
                </Flex>
                {session && <SaveButton postId={postId} isSaved={isSaved} />}
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
            <Separator my={2} mx={6} />
            <Card.Footer>
              <Flex gap="2">
                <Text fontSize="xs" color="gray.500">
                  {viewCount} views
                </Text>
                <Text fontSize="xs" color="gray.500">
                  {commentCount} comments
                </Text>
              </Flex>
            </Card.Footer>
          </Box>
        </Card.Root>
      </FadeInUp>
    </Link>
  );
};

export default PostCard;
