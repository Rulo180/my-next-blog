---
title: "Building a Data Access Layer in Next.js"
description: "How we structured the data access layer in our Next.js project for better maintainability and scalability."
duration: 5
date: "2025-05-04"
imageUrl: "/images/posts/layers.jpg"
---

# Building a Data Access Layer in Next.js

A well-structured data access layer (DAL) is essential for maintaining clean and scalable code. In our project, we implemented a DAL to handle all interactions with the database, ensuring separation of concerns and reusability.

## Why Use a Data Access Layer?
- **Separation of Concerns**: Keeps database logic separate from business logic.
- **Reusability**: Centralizes database queries, making them reusable across the application.
- **Maintainability**: Simplifies updates to database logic by consolidating it in one place.

## Example: Managing Comments

Here's how we handle comments in the `data-access/comments.ts` file:

```ts
import prisma from "@/src/lib/prisma";

export async function getCommentsByPostId(postId: string) {
  return prisma.comment.findMany({
    where: { postId },
    orderBy: { createdAt: "desc" },
  });
}

export async function addComment(postId: string, userId: string, content: string) {
  return prisma.comment.create({
    data: {
      postId,
      userId,
      content,
    },
  });
}

export async function deleteComment(commentId: string) {
  return prisma.comment.delete({
    where: { id: commentId },
  });
}
```

### Key Points
- **Centralized Logic**: All comment-related database operations are in one file.
- **Prisma Integration**: We use Prisma as our ORM for type-safe database queries.

## Example: Managing Posts

Similarly, we handle posts in the `data-access/posts.ts` file:

```ts
import prisma from "@/src/lib/prisma";

export async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getPostById(postId: string) {
  return prisma.post.findUnique({
    where: { id: postId },
  });
}

export async function createPost(title: string, content: string, authorId: string) {
  return prisma.post.create({
    data: {
      title,
      content,
      authorId,
    },
  });
}
```

### Key Points
- **Consistency**: Similar structure across different entities (e.g., comments, posts).
- **Scalability**: Easy to add new database operations as the application grows.

## Conclusion

By implementing a data access layer, we ensure that our database logic is clean, reusable, and easy to maintain. This approach not only improves code quality but also makes the application more scalable.