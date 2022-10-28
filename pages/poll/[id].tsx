import React, { useState } from "react";
import prisma from "../../lib/db";
import Link from "next/link";
import { useRouter } from "next/router";

const OnePoll = ({ poll }) => {
  // const [vote, setVote] = useState(0);
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  // async function newVote() {
  //   fetch("../api/newVote", {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       vote,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       refreshData();
  //     });
  // }

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
      id: true,
      title: true,
      // @ts-ignore
      choices: true,
      vote: true,
    },
  });
  return {
    props: { poll },
  };
};
