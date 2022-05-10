import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

export default function getPostById(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  const {posts} = db.getDb()

  return res.status(200).json({
    payload: posts[query.id as string] || {},
  });
}
