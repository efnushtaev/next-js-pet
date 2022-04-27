export type PostType = {
  id: number;
  userId: number;
  title: string;
  body: string;
  picUrl: string;
  bigPicUrl: string;
};

export type CommentType = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

export type LikeType = {
  postId: string,
  checked: boolean
}
