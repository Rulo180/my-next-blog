import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

interface PostMetadata {
  title: string;
  date: string;
  duration: string;
  views: number;
  comments: number;
  description: string;
  imageUrl: string;
  tags: string[];
}

interface Post {
  slug: string;
  title: string;
  date: string;
  duration: string;
  views: number;
  comments: number;
  description: string;
  imageUrl: string;
}

interface PostWithContent {
  content: string;
  data: PostMetadata;
}

export async function getPosts(): Promise<Post[]> {
  const files = fs.readdirSync(contentDir);
  
  return files.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    const metadata = data as PostMetadata;

    return {
      slug: filename.replace(".md", ""),
      title: metadata.title,
      date: metadata.date,
      duration: metadata.duration,
      views: metadata.views,
      comments: metadata.comments,
      description: metadata.description,
      imageUrl: metadata.imageUrl,
      tags: metadata.tags,
    };
  });
}

export async function getPost(slug: string): Promise<PostWithContent> {
  const filePath = path.join(contentDir, `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(fileContent);

  const metadata = data as PostMetadata;

  return { content, data: metadata };
}