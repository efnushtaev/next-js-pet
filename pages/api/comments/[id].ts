import { NextApiRequest, NextApiResponse } from "next";
import db from "../../../db";

export default function getCommentsById(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  const {comments} = db.getDb()

  return res.status(200).json({
    payload: comments[query.id as string] || {},
  });
}
