import { createContext, FC, useContext } from "react";
import { makeAutoObservable } from "mobx";

import { LikesDbType } from "./type";
import { PostType } from "../models";
class LikesStore {
  likes: LikesDbType = {};

  constructor() {
    makeAutoObservable(this);
  }

  setLikes(likes: LikesDbType) {
    this.likes = {
      ...this.likes,
      ...likes,
    };
  }

  addLike(postId: PostType["id"], checked: boolean) {
    this.likes = {
      ...this.likes,
      [postId]: checked,
    };
  }
}

const StoreContext = createContext<LikesStore>(new LikesStore());

const LikesProvider: FC<{ store: LikesStore }> = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const useLikesStore = () => {
  return useContext(StoreContext);
};

export { LikesStore, LikesProvider, useLikesStore };
