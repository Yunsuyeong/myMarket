import { NextPage } from "next";
import Layout from "../../components/layout";
import useSWR from "swr";
import ItemList from "@components/itemList";
import useUser from "@libs/client/useUser";
import Head from "next/head";

const Sold: NextPage = () => {
  const { user } = useUser();
  return (
    <Layout canGoBack>
      <Head>
        <title>PROFILE | SOLD</title>
      </Head>
      <div className="flex flex-col space-y-5 px-2 py-4">
        <ItemList kind="sales" />
        <button
          className="fixed bottom-24 right-5 cursor-pointer
          rounded-full bg-green-300 p-4 text-black shadow-xl transition-colors hover:bg-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Sold;
