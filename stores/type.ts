import { CommentType, PostType } from "../models";

export type LikesDbType = {
  [postId: PostType['id']]: boolean;
};

export type CommentsDbType = {
  [postId: PostType['id']]: {
    comments: CommentType[]
  };
};

export type PostsDbType = {
  [postId: PostType['id']]: PostType
};

