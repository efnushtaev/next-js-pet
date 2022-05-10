import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";
import { commentsMapper } from "../../mappers/commentsMapper";

export default function comments(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  const dbData = db.getDb();

  if (method === "GET") {
    return loadComments().then((comments) => {
      db.setDb({
        ...dbData,
        comments: { ...commentsMapper(comments), ...dbData.comments },
      });

      res.status(200).json({
        payload: dbData.comments,
      });
    });
  } else if (method === "POST") {
    const { postId, comment } = body;

    if (dbData.comments[postId]) {
      dbData.comments[postId].comments.push(comment);
    } else {
      dbData.comments[postId] = {
        comments: [],
      };
      dbData.comments[postId].comments.push(comment);
    }

    res.status(201).json({
      payload: comment,
    });
  }

  async function loadComments() {
    const comments = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const result = await comments.json();

    return result;
  }
}
