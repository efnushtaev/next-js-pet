import { CommentsDbType, LikesDbType, PostsDbType } from "./stores/type";

interface DbType {
  posts: PostsDbType;
  comments: CommentsDbType;
  likes: LikesDbType;
}

class Db implements DbType {
  public posts: PostsDbType = {};
  public comments: CommentsDbType = {};
  public likes: LikesDbType = {};

  setDb(dbData: DbType) {
    this.posts = dbData.posts;
    this.comments = dbData.comments;
    this.likes = dbData.likes;
  }

  getDb() {
    console.log('this db: ', this.comments)
    return this;
  }
}

const db = new Db()

export default db;
