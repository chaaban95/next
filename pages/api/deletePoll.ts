import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.body;
  try {
    const poll = await prisma.poll.delete({
      where: { id },
    });
    res.status(200).json({ message: "Poll deleted", poll });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
