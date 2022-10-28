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
  const { id, option } = req.body;

  const data = await prisma.poll.findUnique({
    where: {
      // @ts-ignore
      id: parseInt(id),
    },
  });

  if (!data) {
    res.status(200).json({ message: "Poll not found" });
    return;
  }

  const options = data.choices.split(", ");
  if (!options.includes(option)) {
    res.status(200).json({ message: "Invalid option" });
    return;
  }

  await prisma.vote.create({
    data: {
      choice: option,
      pollId: parseInt(id),
    },
  });

  const votes = await prisma.vote.findMany({
    where: {
      pollId: parseInt(id),
    },
  });

  res.status(200).json({ message: "Vote registered", data: votes });
}
