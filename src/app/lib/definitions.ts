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

export type { User, Comment };