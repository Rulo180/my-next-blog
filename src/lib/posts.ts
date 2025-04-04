import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export async function getPosts() {
  const files = fs.readdirSync(contentDir);

  return files.map((filename) => {
    const filePath = path.join(contentDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);

    return {
      slug: filename.replace(".md", ""),
      title: data.title,
      date: data.date,
      duration: data.duration,
      views: data.views,
      comments: data.comments,
      description: data.description,
      imageUrl: data.imageUrl,
    };
  });
}

export async function getPost(slug: string) {
    const filePath = path.join(process.cwd(), "src/content", `${slug}.md`);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data } = matter(fileContent);
    return { content, data };
}