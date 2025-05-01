import fs from "fs";
import path from "path";
import { prisma } from "../src/lib/prisma";
import matter from "gray-matter";

async function seed() {
  const contentDir = path.join(__dirname, "../src/content");
  const files = fs.readdirSync(contentDir);

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data: metadata, content } = matter(fileContent);

    await prisma.post.upsert({
      where: { slug: path.basename(file, path.extname(file)) },
      update: {
        title: metadata.title,
        description: metadata.description,
        date: new Date(metadata.date),
        duration: metadata.duration,
        imageUrl: metadata.imageUrl,
        content,
      },
      create: {
        slug: path.basename(file, path.extname(file)),
        title: metadata.title,
        description: metadata.description,
        date: new Date(metadata.date),
        duration: metadata.duration,
        imageUrl: metadata.imageUrl,
        content,
      },
    });
  }

  console.log("Seeding completed.");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error("Error during seeding:", e);
  prisma.$disconnect();
  process.exit(1);
});