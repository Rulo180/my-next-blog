import Link from "next/link";
import { Container, Grid, GridItem } from "@chakra-ui/react";

import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import PostCard from "@/app/ui/components/PostCard";
import { EmptyState } from "./ui/components/EmptyState";
import { FaCircleExclamation } from "react-icons/fa6";

export default async function HomePage() {
  const posts: (Prisma.PostGetPayload<{
    include: { savedBy: true };
  }>)[] = await prisma.post.findMany({
    include: {
      savedBy: true,
    }
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
        <Grid templateColumns="repeat(2, 1fr)" gap={5} py={5}>
          {posts.map((post) => (
            <GridItem key={post.slug}>
              <Link href={`/blog/${post.slug}`}>
                <PostCard
                  postId={post.id}
                  date={post.date}
                  readingTime={post.duration}
                  title={post.title}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  isSaved={post.savedBy.length > 0}
                />
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
}
