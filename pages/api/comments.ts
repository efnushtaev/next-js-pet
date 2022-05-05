import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../db";
import { commentsMapper } from "../../mappers/commentsMapper";

export default function comments(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

  if (method === "GET") {
    return loadComments().then((comments) => {
      db.comments = {...commentsMapper(comments), ...db.comments, };

      res.status(200).json({
        payload: db.comments,
      });
    });
  } else if (method === "POST") {
    const { postId, comment } = body;

    if (db.comments[postId]) {
      db.comments[postId].comments.push(comment);
    } else {
      db.comments[postId] = {
        comments: [],
      };
      db.comments[postId].comments.push(comment);
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
