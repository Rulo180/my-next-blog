---
title: "Client vs Server Components in Next.js"
description: "Exploring the differences and how Client and Server components work together in Next.js."
duration: 5
date: "2025-05-04"
---

# Client vs Server Components in Next.js

Next.js 13 introduced a powerful feature: the ability to use both Client and Server components in the same application. This approach helps improve performance while keeping the app interactive. Let's look at how these components work together, using examples from our project.

## Example 1: SaveButton Wrapped in a Server Component

In our project, the `SaveButton` component is a Client component that is wrapped inside a Server component. Here's how it looks:

```tsx
// Server Component
import SaveButton from "@/app/ui/components/SaveButton";

const PostActions = async ({ postId }: { postId: string }) => {
  const isSaved = await checkIfPostIsSaved(postId); // Server-side logic

  return <SaveButton postId={postId} isSaved={isSaved} />;
};

export default PostActions;
```

### Why This Approach?
- **Server-Side Logic**: The `checkIfPostIsSaved` function fetches data from the server, ensuring that the `isSaved` state is accurate and up-to-date.
- **Client-Side Interactivity**: The `SaveButton` component handles user interactions, such as saving or unsaving a post.

This separation allows us to use the strengths of both Server and Client components.

## Example 2: Server Component Inside a Client Component

Sometimes, you might need to render a Server component within a Client component. Here's an example:

```tsx
"use client";

import PostMetadata from "@/app/ui/components/PostMetadata";

const PostCard = ({ post }: { post: Post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <PostMetadata postId={post.id} /> {/* Server Component */}
    </div>
  );
};

export default PostCard;
```

### Why This Approach?
- **Dynamic Data**: The `PostMetadata` component fetches data on the server, such as the number of views or comments.
- **Client-Side Rendering**: The `PostCard` component handles client-side interactions, like navigating to the post details page.

## Key Takeaways
- **Better Performance**: Use Server components for data fetching and heavy computations to reduce client-side JavaScript.
- **Interactivity**: Use Client components for interactive elements that require state or event handling.
- **Flexibility**: Combining Client and Server components allows you to build apps that are both fast and interactive.

By understanding the strengths of each type of component, you can make better decisions about how to structure your Next.js application.