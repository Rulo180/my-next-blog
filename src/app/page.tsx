import { Container, Grid, GridItem } from "@chakra-ui/react";
import { FaCircleExclamation } from "react-icons/fa6";

import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { EmptyState } from "@/app/ui/components/EmptyState";
import Posts from "@/app/ui/components/layout/Posts";
import About from "@/app/ui/components/layout/About";

export default async function HomePage() {
  const posts: Prisma.PostGetPayload<{
    include: { savedBy: true };
  }>[] = await prisma.post.findMany({
    include: {
      savedBy: true,
    },
  });

  return (
    <Container as="main">
      {posts.length === 0 ? (
        <EmptyState
          title="There are no posts"
          description="Reach out to the system admin."
          icon={<FaCircleExclamation />}
        />
      ) : (
        <Grid templateColumns={{ lgDown: "1fr", lg: "repeat(3, 1fr)"}} gap={5} py={5}>
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
