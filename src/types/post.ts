export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type PostCreateInput = {
  userId: number;
  title: string;
  body: string;
};

export type PostUpdateInput = Partial<PostCreateInput>;
