import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db";

export default function getCommentsById(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req;

  return res.status(200).json({
    payload: db.comments[query.id as string] || {},
  });
}
