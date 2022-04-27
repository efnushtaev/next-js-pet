import React, { FC, useEffect } from "react";

import { MainLayout } from "../view/layouts/MainLayout";
import { PostContent } from "../view/components/PostContent";
import { useCommentsStore } from "../stores/commentsStore";

import { PostType, CommentType, LikeType } from "../models";

type PostPropsType = {
  serverPost: PostType;
  serverComments: CommentType[];
  serverLike: LikeType["checked"];
};

const Post: FC<PostPropsType> = ({
  serverPost,
  serverComments,
  serverLike = false,
}) => {
  const commentsStore = useCommentsStore();

  const setComments = commentsStore.setComments.bind(commentsStore);

  useEffect(() => {
    if (serverComments.length) {
      setComments(serverComments);
    }
  }, [setComments, serverComments]);

  if (!serverPost || !serverComments) {
    return <h3>ERROR</h3>;
  }

  return (
    <MainLayout title={`Post №${serverPost.id}`}>
      <PostContent isLiked={serverLike} post={serverPost} />
    </MainLayout>
  );
};

export async function getServerSideProps({ params }) {
  const post = await fetch(`${process.env.API_URL}/api/posts/${params.id}`);
  const { payload: serverPost } = await post.json();

  const comments = await fetch(
    `${process.env.API_URL}/api/comments/${params.id}`
  );
  const { payload: serverComments } = await comments.json();

  const likes = await fetch(`${process.env.API_URL}/api/likes`);
  const { payload: serverLikes } = await likes.json();

  const normalizeLikes = serverLikes[params.id + ""] || false;

  return {
    props: {
      serverPost,
      serverLike: normalizeLikes,
      serverComments: serverComments.comments || [],
    },
  };
}

export default Post;
