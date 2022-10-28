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
  const { title, options } = req.body;
  try {
    const data = await prisma.poll.create({
      data: {
        title,
        // @ts-ignore
        choices: options.join(", "),
      },
    });

    res.status(200).json({ message: "Poll created", data });
  } catch (error) {
    res.status(400).json({
      message: `Something went wrong :/ ${error}`,
    });
  }
}
