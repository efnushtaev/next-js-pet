import { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import Image from "next/image";
import Link from "next/link";

import { useCommentsStore } from "../../../stores/commentsStore";
import { useLikesStore } from "../../../stores/likesStore";
import { CommentsList } from "../CommentsList";
import { Divider } from "../Divider";
import { SocialControlls } from "../SocialControlls";

import { PostType, LikeType } from "./../../../models";
import styles from "./styles.module.css";

type PostContentType = {
  post: PostType;
  isLiked: LikeType["checked"];
};

const initComment = {
  name: "",
  email: "",
  body: "",
};

export const PostContent: FC<PostContentType> = observer(
  ({ post, isLiked }) => {
    const [isLike, setLike] = useState(isLiked)
    const [comment, setComment] = useState(initComment);

    const commentsStore = useCommentsStore();
    const likesStore = useLikesStore();

    const { comments } = commentsStore;

    const addComment = commentsStore.addComment.bind(commentsStore);
    const addLike = likesStore.addLike.bind(likesStore);

    async function handleAddCommentClick() {
      const newComment = {
        ...comment,
        id: comments.length + 1,
        postId: post.id,
      };

      const response = await fetch(`${process.env.API_URL}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id, comment: newComment }),
      });
      const { payload } = await response.json();

      addComment(payload);
      setComment(initComment)
    }

    async function handleLikeClick(e) {
      e.stopPropagation();
      const response = await fetch(`${process.env.API_URL}/api/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId: post.id, checked: !isLiked }),
      });
      const { payload } = await response.json();

      addLike(payload.postId, payload.checked);
      setLike(prevState => !prevState)
    }

    function handleNameChange(e) {
      setComment((prevState) => ({ ...prevState, name: e.target.value }));
    }

    function handleEmailChange(e) {
      setComment((prevState) => ({ ...prevState, email: e.target.value }));
    }

    function handleBodyChange(e) {
      setComment((prevState) => ({ ...prevState, body: e.target.value }));
    }

    return (
      <div className={styles.wrapper}>
        {post ? (
          <>
            <section className={styles.postSection}>
              <div className={styles.imageWrapper}>
                <Image
                  src={post.bigPicUrl}
                  alt="Picture of the author"
                  width={680}
                  height={500}
                  blurDataURL={post.bigPicUrl}
                  placeholder="blur"
                />
              </div>
              <div className={styles.handleWrapper}>
                <div className={styles.content}>
                  <div className={styles.textContent}>
                    <p>{post.title}</p>
                    <p>{post.body}</p>
                  </div>
                  <Divider />
                  <div className={styles.socialControlls}>
                    <SocialControlls
                      justify="right"
                      commentsCount={comments.length}
                      callback={handleLikeClick}
                      isLiked={isLike}
                    />
                  </div>
                </div>
                <div className={styles.addCommentForm}>
                  <div className={styles.userDataWrapper}>
                    <label>
                      Email
                      <input
                        tabIndex={1}
                        onChange={handleNameChange}
                        value={comment.name}
                      />
                    </label>
                    <label>
                      Username
                      <input
                        tabIndex={2}
                        onChange={handleEmailChange}
                        value={comment.email}
                      />
                    </label>
                  </div>
                  <div className={styles.newCommentWrapper}>
                    <label>
                      New comment
                      <textarea
                        maxLength={320}
                        tabIndex={3}
                        onChange={handleBodyChange}
                        value={comment.body}
                      />
                    </label>
                  </div>
                  <div className={styles.buttonsGroup}>
                    <Link href="/">
                      <a tabIndex={5}>Back to all posts</a>
                    </Link>
                    <button
                      className={styles.addCommentBtn}
                      tabIndex={4}
                      onClick={handleAddCommentClick}
                    >
                      add new comment
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <Divider />
            <section className={styles.commentsSection}>
              <CommentsList />
            </section>
          </>
        ) : null}
      </div>
    );
  }
);
