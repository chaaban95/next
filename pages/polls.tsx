import Head from "next/head";
import prisma from "../lib/db";
import { Poll } from ".prisma/client";
import Link from "next/link";

export default function PollsPage({ poll }) {
  return (
    <>
      <Link href="/create">
        <a>Create</a>
      </Link>
      {poll.map((item: Poll) => (
        <>
          <p>{item.title}</p>
          {/* @ts-ignore */}
          <p>{item.choices}</p>
        </>
      ))}
    </>
  );
}

export const getServerSideProps = async () => {
  const poll = await prisma.poll.findMany({
    select: {
      title: true,
      // @ts-ignore
      choices: true,
    },
  });
  return {
    props: {
      poll,
    },
  };
};
