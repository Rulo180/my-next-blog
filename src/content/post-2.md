---
title: "Getting started with Prisma ORM"
description: We are going to talk about how I configure Prisma ORM in my project.
date: "2025-04-03"
duration: 3
views: 5
imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
tags: ['personal']
---

# Prisma ORM

## Why do you probably need an ORM

An ORM (Object-Relational Mapper) like Prisma simplifies database interactions by abstracting SQL queries into a programmatic API. It improves developer productivity by allowing you to work with database records as objects, reducing boilerplate and manual query writing. Prisma also ensures type safety by generating types based on your schema, catching errors at compile time. Additionally, it manages relationships (e.g., 'User' and 'Comment' in your schema) and migrations, making it easier to maintain and evolve your database schema over time.

## Getting started

First, you need to install the Prisma package:

`npm install prisma --save-dev`

Then, run prisma init to initialize Prisma ORM in your project. I particularly added this params to specify that I want a SQLite database.

`npx prisma init --datasource-provider sqlite`

Since I didn't specify a custom output folder, the init command will generate the prisma file in your root folder with the following content:

``` ts
// schema.prisma

// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
  output   = "../src/generated/prisma"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}
```

The init command will also update your `.env` file with a variable to store your database url

``` js
# This was inserted by `prisma init`:
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
```

> **_NOTE:_** Make sure that you have a specific entry in your `.gitignore` to avoid tracking for your `.env` file. We don't want to expose the database url in our GitHub repo.

Then, I added the models that I'm going to need in my app. Since the post are being stored as Markdown files in the project folder, I only need a table to users and another table for comments. This is how I defined the two models:

``` ts
// schema.prisma

...

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

In Prisma, relations between models are defined using foreign keys and the `@relation` attribute. In your schema:

- **`User` and `Comment` Relationship**: This is a one-to-many relationship. A `User` can have multiple `Comment`s, and each `Comment` belongs to a single `User`.
- **Relation Definition**:
    - In the `Comment` model, the `userId` field acts as the foreign key, referencing the `id` field in the `User` model.
    - The `@relation(fields: [userId], references: [id])` attribute explicitly defines this relationship, ensuring that `userId` in `Comment` maps to `id` in `User`.
- **Back-Relation**:
    - The `Comment` field in the `User` model establishes the reverse relationship, allowing you to query all comments associated with a user.

Once you finish with you schema definition, you may wanna create a database based  on that schema. To do this you should run `npx prisma db push`.
This will "push" your schema to the database. Any changes you did to the schema, will be replicated in the database.
You can also "pull" changes from your DB and Prisma will update your schema file accordingly using `npx prisma db pull`

Lastly, you can take a look of how your new brand database looks like using `npx prisma studio`. This will bootstrap a simple web page where you can navigate through the tables in your database.

There you have it! Your Prisma ORM is ready to start interacting with your database. In a next post where are going to dive into how you can interact with your database to create, edit or delete records.

See you there.
