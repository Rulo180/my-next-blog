import Link from "next/link";
import { Grid, GridItem } from "@chakra-ui/react";

import { auth } from "@/auth";
import PostCard from "@/app/ui/components/PostCard";
import { Prisma } from "@/generated/prisma";

interface PostsProps {
  posts: Prisma.PostGetPayload<{
    include: { savedBy: true };
  }>[];
}

export default async function Posts({ posts }: PostsProps) {
  const session = await auth();
  return (
    <Grid templateColumns={{ xlDown: "1fr" , xl: "repeat(2, 1fr)"}} gap={5}>
      {posts.map((post) => {
        const isSaved = !session
          ? false
          : post.savedBy.some(
              (savedPost) => savedPost.userId === session.user!.id
            );
        return (
          <GridItem key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              <PostCard
                postId={post.id}
                date={post.date}
                readingTime={post.duration}
                title={post.title}
                description={post.description}
                imageUrl={post.imageUrl}
                isSaved={isSaved}
              />
            </Link>
          </GridItem>
        );
      })}
    </Grid>
  );
}
