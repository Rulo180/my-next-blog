import Link from "next/link";
import { Container, Grid, GridItem } from "@chakra-ui/react";

import { getPosts } from "@/app/lib/posts";
import PostCard from "@/app/ui/components/PostCard";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <Container as="main">
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
                viewCount={post.views}
              />
            </Link>
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
}
