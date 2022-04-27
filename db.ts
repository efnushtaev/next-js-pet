import { CommentsDbType, LikesDbType, PostsDbType } from "./stores/type";

export const db: {
  posts: PostsDbType;
  comments: CommentsDbType;
  likes: LikesDbType;
} = {
  posts: {},
  comments: {},
  likes: { 1: true },
};
