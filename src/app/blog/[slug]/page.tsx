import { Box, Container, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import CommentSection from "@/app/ui/components/CommentSection";
import Markdown from "@/app/ui/components/Markdown";
import Socials from "@/app/ui/components/Socials";

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post) {
    // TODO: Show an alert message
    throw new Error(`Post with slug "${slug}" not found`);
  }

  const { content, title, description, date, duration, imageUrl } = post;

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
          <Flex
            justifyContent="flex-end"
            gap="2"
            fontSize="md"
            color="gray.500"
          >
            <Text>{date.toLocaleDateString()}</Text>-<Text>{duration} minutes</Text>
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
