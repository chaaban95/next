import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {
  const [title, setTitle] = useState("");
  const [options, setOptions] = useState(["Option 1", "Option 2"]);
  const [error, setError] = useState("");

  const submit = (event) => {
    event.preventDefault();
    setError("");

    if (title.length < 5 || title.length > 60) {
      setError("Title must be between 5 and 100 characters");
      return;
    }

    if (options.some((option) => option.length < 2 || option.length > 60)) {
      setError("Options must be between 2 and 30 characters");
      return;
    }

    type Data = {
      message: string;
      error: boolean;
      data?: any;
    };

    fetch("./api/createPoll", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        options,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        const rsp: Data = res as any as Data;

        if (rsp.error) {
          setError(rsp.message);
        } else {
          window.location.href = `/poll/${rsp.data.id}`;
        }
      });
  };

  return (
    <>
      <Link href="/polls">
        <a>All Polls</a>
      </Link>
      <h1>Create Poll</h1>
      <h3>Title</h3>
      <form onSubmit={submit}>
        <input
          placeholder="Poll Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>Options (Min. 2, Max. 5)</h3>
        <>
          {options.map((option, index) => (
            <>
              <input
                placeholder="Option"
                value={option}
                onChange={(e) => {
                  const newOptions = [...options];
                  newOptions[index] = e.target.value;
                  setOptions(newOptions);
                }}
              />

              <button
                onClick={() => {
                  const newOptions = [...options];
                  newOptions.splice(index, 1);
                  setOptions(newOptions);
                }}
                disabled={options.length <= 2}
              >
                Delete
              </button>

              <button
                onClick={() => {
                  const newOptions = [...options];
                  newOptions.push("");
                  setOptions(newOptions);
                }}
                disabled={options.length >= 5 || index !== options.length - 1}
              >
                Add
              </button>
            </>
          ))}
        </>

        <button type="submit">Create Poll</button>
      </form>
      <p>Data: {JSON.stringify(options)}</p>
      <p>Error: {JSON.stringify(error)}</p>
    </>
  );
};

export default Home;
