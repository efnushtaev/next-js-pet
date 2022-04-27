import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {method, body} = req

  if (method === "GET") {
    res.status(200).json({payload: db.likes});

  } else if (req.method === "POST") {
    db.likes[req.body.postId] = body.checked;

    res.status(201).json({
      payload: body,
    });
  }
}
