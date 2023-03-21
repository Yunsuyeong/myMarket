import Input from "@components/input";
import { NextPage } from "next";
import Head from "next/head";
import Layout from "../../components/layout";

const ChatsDetail: NextPage = () => {
  return (
    <Layout canGoBack>
      <Head>
        <title>CHAT | 1</title>
      </Head>
      <div className="space-y-3 px-2 py-8">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="text-md w-1/2 rounded-md border p-2 font-semibold">
            <p>Hi!</p>
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-2 space-x-reverse">
          <div className="h-8 w-8 rounded-full bg-slate-300" />
          <div className="text-md w-1/2 rounded-md border p-2 font-semibold">
            <p>Hello!</p>
          </div>
        </div>
        <form className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md">
          <div className="relative mx-auto flex w-full max-w-md items-center">
            <input
              className="w-full rounded-full text-black shadow-sm"
              type="text"
            />
            <div className="absolute inset-y-0 right-0 py-2 pr-2">
              <button className="flex items-center rounded-full bg-green-300 px-3 text-sm text-black hover:bg-green-500">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatsDetail;
