import React from "react";
import prisma from "../../lib/db";
import Link from "next/link";

const OnePoll = ({ poll }) => {
  return (
    <>
      <Link href="/polls">
        <a>All Polls</a>
      </Link>
      <p>{poll.title}</p>
      <p>{poll.choices}</p>
    </>
  );
};

export default OnePoll;

export const getServerSideProps = async (context) => {
  const id = context.params.id;
  const poll = await prisma.poll.findUnique({
    where: {
      id: id,
    },
    select: {
      title: true,
      // @ts-ignore
      choices: true,
    },
  });
  return {
    props: { poll },
  };
};
