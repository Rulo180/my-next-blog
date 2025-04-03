import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main>
      <h1>Welcome to My Blog</h1>
      <p>Here are some of my latest posts:</p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}