import { Container, Flex, Grid, GridItem, Separator } from "@chakra-ui/react";
import { FaCircleExclamation } from "react-icons/fa6";

import { getFeaturedPostAction, getPostsAction } from "@/actions/posts";
import { EmptyState } from "@/app/ui/components/EmptyState";
import Posts from "@/app/ui/components/layout/Posts";
import About from "@/app/ui/components/layout/About";
import FeaturedPost from "@/app/ui/components/FeaturedPost";

export default async function HomePage() {
  const posts = await getPostsAction();
  const featuredPost = await getFeaturedPostAction();

  return (
    <Container as="main">
      {posts.length === 0 ? (
        <EmptyState
          title="There are no posts"
          description="Reach out to the system admin."
          icon={<FaCircleExclamation />}
        />
      ) : (
        <Grid
          templateColumns={{ lgDown: "1fr", lg: "repeat(3, 1fr)" }}
          gap={5}
          py={5}
        >
          {featuredPost && (
            <GridItem colSpan={3} py={4}>
              <Flex direction="column" gap={8}>
                <FeaturedPost
                  date={featuredPost.date}
                  readingTime={featuredPost.duration}
                  title={featuredPost.title}
                  description={featuredPost.description}
                  imageUrl={featuredPost.imageUrl}
                />
                <Separator />
              </Flex>
            </GridItem>
          )}
          <GridItem colSpan={2}>
            <Posts posts={posts} />
          </GridItem>
          <GridItem>
            <About />
          </GridItem>
        </Grid>
      )}
    </Container>
  );
}
