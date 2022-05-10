import { NextApiRequest, NextApiResponse } from "next";
import db from "../../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method, body} = req

  const {likes} = db.getDb()

  if (method === "GET") {
    res.status(200).json({payload: likes});

  } else if (req.method === "POST") {
    likes[req.body.postId] = body.checked;

    res.status(201).json({
      payload: body,
    });
  }
}
