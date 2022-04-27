import { CommentType } from "../models";

export function commentsMapper(comments: CommentType[]) {
  return comments.reduce((acc, comment) => {
    function getComments(
      comments: CommentType[],
      comment: CommentType
    ) {
      if (comments) {
        return [
          ...comments,
          {
            id: comment.id,
            body: comment.body,
            name: comment.name,
            email: comment.email,
            postId: comment.postId
          },
        ];
      } else {
        return [
          {
            id: comment.id,
            body: comment.body,
            name: comment.name,
            email: comment.email,
            postId: comment.postId
          },
        ];
      }
    }

    return {
      ...acc,
      [comment.postId]: {
        comments: [...getComments(acc[comment.postId]?.comments, comment)],
      },
    };
  }, {});
}
