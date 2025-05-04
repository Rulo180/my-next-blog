import { Box, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";

import { auth } from "@/auth";
import PostCard from "@/app/ui/components/PostCard";
import { Post, SavedPost } from "@/generated/prisma";

interface PostsProps {
  posts: (Post & { savedBy: SavedPost[] })[];
}

export default async function Posts({ posts }: PostsProps) {
  const session = await auth();
  return (
    <Box as="section">
      <Flex direction="column" gap={2} mb={8}>
        <Heading as="h2" fontSize="3xl">
          My NextJS Blog
        </Heading>
        <Text>
          The following posts reflect the learning and experiences I gained
          while working on this project.
        </Text>
      </Flex>
      <Grid templateColumns={{ xlDown: "1fr", xl: "repeat(2, 1fr)" }} gap={5}>
        {posts.map((post) => {
          const isSaved = !session
            ? false
            : post.savedBy.some(
                (savedPost) => savedPost.userId === session.user!.id
              );
          return (
            <GridItem key={post.slug}>
              <PostCard
                url={`/blog/${post.slug}`}
                postId={post.id}
                date={post.date}
                readingTime={post.duration}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                viewCount={post.viewCount}
                isSaved={isSaved}
              />
            </GridItem>
          );
        })}
      </Grid>
    </Box>
  );
}
