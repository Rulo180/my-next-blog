import { Container, Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { FaBookmark } from "react-icons/fa";

import { auth } from "@/auth";
import PostCard from "@/app/ui/components/PostCard";
import { EmptyState } from "@/app/ui/components/EmptyState";
import { getSavedPostsAction } from "@/actions/posts";

export default async function SavedPage() {
  const session = await auth();
  const userId = session?.user?.id;

  const savedPosts = await getSavedPostsAction(userId as string);

  return (
    <Container as="main" py={8}>
      <Flex direction="column" gap={2} mb={8}>
        <Heading as="h2" fontSize="3xl">
          Saved Posts
        </Heading>
        <Text>Here you can see all the posts you saved.</Text>
      </Flex>
      {savedPosts.length === 0 ? (
        <EmptyState
          title="No saved posts yet"
          description="You can save posts by clicking the bookmark icon on any post."
          icon={<FaBookmark />}
        />
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
          {savedPosts.map(({ post }) => (
            <GridItem key={post.id}>
              <PostCard
                url={`/blog/${post.slug}`}
                postId={post.id}
                date={post.date}
                readingTime={post.duration}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                isSaved={true}
              />
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
}
