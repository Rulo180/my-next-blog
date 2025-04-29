import Link from "next/link";
import { Container, Grid, GridItem } from "@chakra-ui/react";

import { prisma } from "@/lib/prisma";
import PostCard from "@/app/ui/components/PostCard";
import { EmptyState } from "./ui/components/EmptyState";
import { FaCircleExclamation } from "react-icons/fa6";

export default async function HomePage() {
  const posts = await prisma.post.findMany({});

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
                  postId={post.slug}
                  date={post.date}
                  readingTime={post.duration}
                  title={post.title}
                  description={post.description}
                  imageUrl={post.imageUrl}
                  viewCount={0}
                />
              </Link>
            </GridItem>
          ))}
        </Grid>
      )}
    </Container>
  );
}
