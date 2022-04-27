import { FC } from "react";
import Image from "next/image";
import { observer } from "mobx-react-lite";
import Link from "next/link";

import { SocialControlls } from "../SocialControlls/SocialControlls";
import { useLikesStore } from "../../../stores/likesStore";

import styles from "./styles.module.css";
import { PostType } from "../../../models";

type PostCardType = {
  title: PostType['title'];
  body: PostType['body'];
  postId: PostType['id'];
  commentsCount: number;
  picUrl: string;
};

export const PostCard: FC<PostCardType> = observer(
  ({ title, body, commentsCount, postId, picUrl }) => {
    const likesStore = useLikesStore();

    const addLike = likesStore.addLike.bind(likesStore);
    const { likes } = likesStore;

    async function handleLikeClick(e: Event) {
      e.stopPropagation();
      const response = await fetch(`${process.env.API_URL}/api/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ postId, checked: !likes[postId] }),
      });
      const { payload } = await response.json();

      addLike(payload.postId, payload.checked);
    }

    return (
      <Link href={`/${postId}`} passHref={true}>
        <div className={styles.wrapper}>
          <p className={styles.title}>{title}</p>
          {picUrl && (
            <Image
              src={picUrl}
              alt="Picture of the author"
              width={440}
              height={240}
              blurDataURL={picUrl}
              placeholder="blur"
              className={styles.picture}
            />
          )}
          <p className={styles.description}>{body}</p>
          <SocialControlls
            justify="center"
            commentsCount={commentsCount}
            callback={handleLikeClick}
            isLiked={likes[postId]}
          />
        </div>
      </Link>
    );
  }
);
