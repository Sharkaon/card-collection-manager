import MainLayout from "@/components/mainLayout";
import { type NextPage } from "next";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";
import { type FormEvent, useState } from "react";
import Router from "next/router";

const NewGroup: NextPage = () => {
  const [name, setName] = useState<string>("");

  const { data: sessionData } = useSession();

  const createGroupMutation = api.groups.create.useMutation({ onSuccess: () => {
    setName("");
    setTimeout((): void => {
      void Router.push("/groups");
    }, 1000)
  }});

  const handleChangeName = (e: FormEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createGroupMutation.mutate({
      name,
      userId: sessionData?.user.id || "",
     });
  };

  return (
    <MainLayout>
      <form className="text-white flex flex-col justify-around h-60 align-middle flex-auto text-2xl" onSubmit={handleSubmit}>
        <h1 className="text-4xl">Create a new group</h1>

        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            className="rounded text-black"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChangeName}
          />
        </div>

        <button
          className="bg-blue-400 rounded hover:bg-green-400"
          type="submit"
          disabled={ createGroupMutation.isLoading }
        >Create</button>

        { createGroupMutation.isError && <p>Something went wrong</p> }
        { createGroupMutation.isSuccess && <p>Group created</p> }
      </form>
    </MainLayout>
  );
};

export default NewGroup;
