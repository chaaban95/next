import prisma from "../lib/db";
import { Poll } from ".prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PollsPage({ poll }) {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  async function deletePoll() {
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
          <Link href={`/poll/${item.id}`}>Vote</Link>
          <button onClick={async () => deletePoll(item.id)}>delete</button>
        </>
      ))}
    </>
  );
}

export const getServerSideProps = async () => {
  const poll = await prisma.poll.findMany({
    select: {
      id: true,
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
