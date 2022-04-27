import { observer } from "mobx-react-lite";
import { FC, useMemo } from "react";
import { useCommentsStore } from "../../../stores/commentsStore";

import styles from "./styles.module.css";

export const CommentsList: FC = observer(() => {
  const commentsStore = useCommentsStore();

  const { comments } = commentsStore;

  const commentsList = useMemo(() => {
    const reversComments = comments.reduce((acc, item) => {
      acc.unshift(item);
      return acc;
    }, []);

    return reversComments.map((comment) => {
      return (
        <div className={styles.wrapper} key={comment.id}>
          <p>{comment.name}</p>
          <p>{comment.email}</p>
          <p>{comment.body}</p>
        </div>
      );
    });
  }, [comments]);

  return <>{commentsList}</>;
});
