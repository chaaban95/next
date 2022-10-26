import Head from "next/head";
import prisma from "../lib/db";
import { Poll } from ".prisma/client";
import Link from "next/link";
import OnePoll from "./poll/[id]";
import { useRouter } from "next/router";

export default function PollsPage({ poll }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function deletePoll(id: string) {
    try {
      fetch("./api/deletePoll", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      }).then(() => {
        refreshData();
      });
    } catch (error) {
      console.log(error);
    }
  }

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
          <button>Vote</button>
          <button onClick={async () => deletePoll(item.id)}>delete</button>
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
