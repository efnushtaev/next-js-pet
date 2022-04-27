import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";

export default function getPostById(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  return res.status(200).json({
    payload: db.posts[query.id as string] || {},
  });
}
