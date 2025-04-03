import { getPost } from '@/lib/posts';

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  return (
    <article>
      <h1>{post.data.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}