import { NextApiRequest, NextApiResponse } from "next";
import { postsMapper } from "../../mappers/postsMappers";
import db from "../../db";

export default function posts(req: NextApiRequest, res: NextApiResponse) {
  async function loadPosts() {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    const postsResult = await posts.json();

    const result = postsResult.map((post) => ({
      ...post,
      picUrl: `https://picsum.photos/id/${post.id}/440/240`,
      bigPicUrl: `https://picsum.photos/id/${post.id}/680/500`,
    }));

    db.setDb({...db, posts: postsMapper(result)})
    return postsMapper(result);
  }

  return loadPosts().then((posts) => {
    res.status(200).json({
      payload: posts,
    });
  });
}
