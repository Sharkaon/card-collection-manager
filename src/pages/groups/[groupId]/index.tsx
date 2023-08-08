import Link from "next/link";
import MainLayout from "@/components/mainLayout";
import type { NextPage } from "next";
import { api } from "@/utils/api";
import { useRouter } from 'next/router';

const GroupDetail: NextPage = () => {
  const router = useRouter();

  const groupId = router.query.groupId as string;

  const groups = api.booster.list.useQuery({ groupId });

  return (
    <MainLayout>
      <div>
        <h1 className="text-4xl text-white">Group {groupId}</h1>
        { groups.data?.map((booster) => (
          <div key={booster.id} className="p-6 rounded bg-white shadow-lg text-2xl text-black no-underline transition hover:bg-gray-200">
            {booster.name}
            {booster.price}
            {booster.cardPerPack} cards
          </div>
        )) }
        <Link href={`${groupId}/boosters/new`}>
          <button className="bg-green-400 rounded px-10 py-3 font-semibold text-white no-underline transition hover:bg-blue-400">
            NEW BOOSTER
          </button>
        </Link>
      </div>
    </MainLayout>
  );
}

export default GroupDetail;
