import prisma from "../lib/db";
import { Poll } from ".prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";

export default function PollsPage({ poll }) {
  const router = useRouter();

  async function deletePoll(item) {
    fetch("./api/deletePoll", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
      }),
    }).then((res) => res.json());
  }

  return (
    <>
      <Link href="/create">
        <a>Create</a>
      </Link>
      {poll.map((item: Poll) => (
        <div key={item.id}>
          <p>{item.title}</p>
          {/* @ts-ignore */}
          <p>{item.choices}</p>
          <Link href={`/poll/${item.id}`}>Vote</Link>
          <button onClick={async () => deletePoll(item)}>delete</button>
        </div>
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
