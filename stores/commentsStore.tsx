import { createContext, FC, useContext } from "react";
import { makeAutoObservable } from "mobx";

import { CommentType, PostType } from "../models";
class CommentsStore {
  comments: CommentType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setComments(comments: CommentType[]) {
    this.comments = [...comments];
  }

  addComment(comment: CommentType) {
    this.comments = [...this.comments, comment];
  }
}

const StoreContext = createContext<CommentsStore>(new CommentsStore());

const CommentsProvider: FC<{ store: CommentsStore }> = ({
  store,
  children,
}) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useCommentsStore = () => {
  return useContext(StoreContext);
};

export { CommentsStore, CommentsProvider, useCommentsStore };
