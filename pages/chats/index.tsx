import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  const router = useRouter();
  return (
    <Layout title="Chat" hasTabBar>
      <Head>
        <title>CHAT</title>
      </Head>
      <div className="divide-y-[1px] py-4 sm:absolute sm:left-0 sm:right-0 sm:grid sm:w-full sm:grid-cols-2 sm:gap-4">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <div
            key={i}
            className="flex cursor-pointer items-center space-x-4 border-t px-2 py-2 last:border-b-0"
            onClick={() => router.push(`/chats/${i}`)}
          >
            <div className="h-16 w-16 rounded-full bg-gray-400" />
            <div>
              <p className="text-md font-semibold">name</p>
              <p className="text-sm">message</p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
