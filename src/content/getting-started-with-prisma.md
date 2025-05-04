---
title: "Getting started with Prisma ORM"
description: "Learn how to configure Prisma ORM in your project and set up your database schema."
date: "2025-04-20"
duration: 3
imageUrl: "/images/posts/database.jpg"
---

# Getting Started with Prisma ORM

## Why Use an ORM?

An ORM (Object-Relational Mapper) like Prisma simplifies database interactions by abstracting SQL queries into a programmatic API. It improves developer productivity by allowing you to work with database records as objects, reducing boilerplate and manual query writing. Prisma also ensures type safety by generating types based on your schema, catching errors at compile time. Additionally, it manages relationships (e.g., `User` and `Comment` in your schema) and migrations, making it easier to maintain and evolve your database schema over time.

## Setting Up Prisma

First, install the Prisma package:

```bash
npm install prisma --save-dev
```

Then, initialize Prisma ORM in your project. In this example, we specify SQLite as the database provider:

```bash
npx prisma init --datasource-provider sqlite
```

This command generates a `prisma` folder with a `schema.prisma` file and updates your `.env` file with a `DATABASE_URL` variable:

```prisma
// schema.prisma

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

```env
# .env
DATABASE_URL="file:./dev.db"
```

> **Note**: Add `.env` to your `.gitignore` file to avoid exposing sensitive information.

## Defining Models

In this project, we only need tables for users and comments. Here’s how we defined the models:

```prisma
model User {
  id        String    @id @default(cuid())
  name      String
  email     String    @unique
  password  String
  createdAt DateTime  @default(now())
  Comment   Comment[]
}

model Comment {
  id        String   @id @default(cuid())
  content   String
  createdAt DateTime @default(now())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  postId    String
}
```

### Relationships
- **User and Comment**: A one-to-many relationship where a `User` can have multiple `Comment`s, and each `Comment` belongs to a single `User`.
- **Foreign Keys**: The `userId` field in `Comment` references the `id` field in `User`.

## Applying the Schema

To create the database schema, run:

```bash
npx prisma db push
```

This command syncs your schema with the database. You can also pull changes from the database using:

```bash
npx prisma db pull
```

## Exploring the Database

Use Prisma Studio to explore your database:

```bash
npx prisma studio
```

This opens a web interface where you can view and manage your data.

## Conclusion

With Prisma ORM set up, you’re ready to interact with your database. In future posts, we’ll explore how to perform CRUD operations using Prisma.
