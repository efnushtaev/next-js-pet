import { PostType } from "../models";

export function postsMapper(posts: PostType[]) {
  return posts.reduce((acc, post) => {
    return {
      ...acc,
      [post.id]: {
        userId: post.userId,
        title: post.title,
        body: post.body,
        id: post.id,
        picUrl: post.picUrl,
        bigPicUrl: post.bigPicUrl,
        isLiked: false
      },
    };
  }, {});
}