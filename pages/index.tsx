import { FC, useEffect, useMemo } from "react";

import { MainLayout } from "../view/layouts/MainLayout";

import { CommentType, PostType } from "../models";
import { useLikesStore } from "../stores/likesStore";
import { LikesDbType } from "../stores/type";
import { PostCard } from "../view/components/PostCard";
import { Divider } from "../view/components/Divider";
import { db } from "../db";

type IndexType = {
  serverPosts: { comments: CommentType[]; post: PostType }[];
  serverLikes: LikesDbType;
};

const Index: FC<IndexType> = ({ serverPosts, serverLikes }) => {
  const likesStore = useLikesStore();
  const setLikes = likesStore.setLikes.bind(likesStore);

  useEffect(() => {
    if (serverLikes) {
      debugger
      setLikes(serverLikes);
    }
  }, [setLikes, serverLikes]);

  const postsList = useMemo(() => {
    if (serverPosts.length) {
      let count = 0;

      return serverPosts.map((post) => {
        const { id, title, picUrl } = post.post;
        
        count++;
        if (count % 3 == 0) {
          return (
            <>
              <PostCard
                key={id}
                postId={id}
                title={title}
                body={post.post.body}
                commentsCount={post.comments.length}
                picUrl={picUrl}
              />
              <Divider />
            </>
          );
        } else
          return (
            <PostCard
              key={id}
              postId={id}
              title={title}
              body={post.post.body}
              commentsCount={post.comments.length}
              picUrl={picUrl}
            />
          );
      });
    }
  }, [serverPosts]);

  return (
    <MainLayout title="All posts">
      {postsList}
    </MainLayout>
  );
};

export async function getServerSideProps() {
  const posts = await fetch(`${process.env.API_URL}/api/posts`);
  const { payload: serverPosts } = await posts.json();

  const comments = await fetch(`${process.env.API_URL}/api/comments`);
  const { payload: serverComments } = await comments.json();

  const normalizePosts = Object.keys(serverPosts).map((postId) => {
    return {
      comments: serverComments[postId].comments,
      post: serverPosts[postId],
    };
  });

  const likes = await fetch(`${process.env.API_URL}/api/likes`);
  const { payload: serverLikes } = await likes.json();

  return {
    props: {
      serverPosts: normalizePosts,
      serverLikes
    },
  };
}

export default Index;
