import Link from "next/link";
import MainLayout from "@/components/mainLayout";
import { type NextPage } from "next";
import { api } from "@/utils/api";
import { useSession } from "next-auth/react";

const Landing: NextPage = () => {
  const { data: sessionData } = useSession();

  const groups = api.groups.list.useQuery({ userId: sessionData?.user.id || "" });

  if (!sessionData) {
    return <h1>Not logged in</h1>;
  }

  return (
    <MainLayout>
      <h1 className="text-4xl text-white">Welcome, { sessionData.user.name || '' }</h1>
      { !!groups.data?.length && <span className="text-3xl text-white">Select your group</span> }
      { groups.data?.map((group) => (
        <Link
          key={group.id}
          href={`/groups/${group.id}`}
          className="p-6 rounded bg-white shadow-lg text-2xl text-black no-underline transition hover:bg-gray-200"
        >
          {group.name}
        </Link>
      )) }
      <Link href="/groups/new">
        <button
          className="bg-green-400 rounded px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-400"
        >
          NEW GROUP
        </button>
      </Link>
    </MainLayout>
  )
};

export default Landing;
