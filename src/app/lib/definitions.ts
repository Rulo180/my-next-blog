interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date; 
}

interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  userId: string;
  postId: string;
}

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  date: Date;
  duration: number;
  imageUrl: string;
  slug: string;
  comments?: Comment[];
}

export type { User, Comment, Post };