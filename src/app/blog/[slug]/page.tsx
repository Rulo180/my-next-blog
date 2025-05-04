import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import { auth } from "@/auth";
import { getPostByslugAction, getSavedPostStatus } from "@/actions/posts";
import { incrementPostViewCount } from "@/data-access/posts";
import CommentSection from "@/app/ui/components/CommentSection";
import Markdown from "@/app/ui/components/Markdown";
import Socials from "@/app/ui/components/Socials";
import SaveButton from "@/app/ui/components/SaveButton";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostByslugAction(slug);

  if (!post) {
    throw new Error(`Post with slug "${slug}" not found`);
  }
  const session = await auth();

  await incrementPostViewCount(post.id)

  const { id, content, title, description, date, duration, imageUrl } = post;

  const isSaved = await getSavedPostStatus(id);

  return (
    <Container as="main" py={8}>
      <Flex
        as="article"
        direction="column"
        gap="8"
        borderWidth="1px"
        borderColor="border.disabled"
        p={12}
      >
        <Box>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex
              justifyContent="flex-end"
              gap="2"
              fontSize="md"
              color="gray.500"
            >
              <Text>{date.toLocaleDateString()}</Text>-<Text>{duration} minutes</Text>
            </Flex>
            {session && (<SaveButton postId={id} isSaved={isSaved} />)}
          </Flex>
          <Heading size="5xl" pb="8">
            {title}
          </Heading>
        </Box>
        <Box>
          <Text fontSize="lg" pb="4">
            {description}
          </Text>
          <Image width={800} height={533} src={imageUrl} alt="Post image" />
          <Box mt={4}>
            <Markdown content={content} />
          </Box>
        </Box>
        <Flex direction="column" gap="6">
          <Flex gap="5" alignItems="center">
            <Socials />
          </Flex>
          <CommentSection post={post} />
        </Flex>
      </Flex>
    </Container>
  );
}
