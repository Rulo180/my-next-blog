import fs from "fs";
import path from "path";
import matter from "gray-matter";
import bcrypt from "bcrypt";

import { prisma } from "../src/lib/prisma";

async function seed() {
  const contentDir = path.join(__dirname, "../src/content");
  const files = fs.readdirSync(contentDir);

  const users = [
    {
      name: "Martin Valles",
      email: "martin@gmail.com",
      password: await bcrypt.hash("12341234", 10),
    },
    {
      name: "John Doe",
      email: "john@gmail.com",
      password: await bcrypt.hash("12341234", 10),
    },
    {
      name: "Jane Smith",
      email: "jane@gmail.com",
      password: await bcrypt.hash("12341234", 10),
    }
  ];

  const createdUsers = [];
  for (const user of users) {
    const createdUser = await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
    createdUsers.push(createdUser);
  }

  const commentOptions = [
    "I really liked it. Thanks!",
    "Great content. Keep it up bro.",
    "Thanks for sharing! <3",
    "My best finding today? your blog! :D",
    "Interesting topic. I wanna learn more about it now!",
  ];

  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const { data: metadata, content } = matter(fileContent);

    const post = await prisma.post.upsert({
      where: { slug: path.basename(file, path.extname(file)) },
      update: {
        title: metadata.title,
        description: metadata.description,
        date: new Date(metadata.date),
        duration: metadata.duration,
        imageUrl: metadata.imageUrl,
        content,
        viewCount: 0,
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

    const numberOfComments = Math.floor(Math.random() * 3);
    const selectedUsers = createdUsers.sort(() => 0.5 - Math.random()).slice(0, numberOfComments);
    for (const user of selectedUsers) {
      const randomComment = commentOptions[Math.floor(Math.random() * commentOptions.length)];
      await prisma.comment.create({
        data: {
          content: randomComment,
          userId: user.id,
          postId: post.id,
        },
      });
    }
  }

  console.log("Seeding completed.");
  await prisma.$disconnect();
}

seed().catch((e) => {
  console.error("Error during seeding:", e);
  prisma.$disconnect();
  process.exit(1);
});