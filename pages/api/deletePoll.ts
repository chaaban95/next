import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/db";

type Data = {
  message: string;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.body;
  try {
    const data = await prisma.poll.delete({
      where: {
        id,
      },
      select: {
        title: true,
      },
    });

    res.status(200).json({ message: "Poll deleted", data });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
