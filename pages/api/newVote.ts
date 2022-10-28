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
    const data = await prisma.poll.update({
      where: {
        id,
      },
      data: {
        // @ts-ignore
        vote: {
          increment: 1,
        },
      },
    });

    res.status(200).json({ message: "Vote registered", data });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
