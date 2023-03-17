import { NextPage } from "next";
import Layout from "../../components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Live } from "@prisma/client";

interface ILiveResponse {
  ok: true;
  live: Live;
}

const Live: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR<ILiveResponse>(
    router.query.id && `/api/lives/${router.query.id}`
  );
  return (
    <Layout canGoBack>
      <div className="space-x-2 px-2 py-8">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
        <div>
          <h3 className="mt-2 text-center text-2xl font-bold">
            {data?.live?.name}
          </h3>
          <span className="mt-2 block text-xl">{data?.live?.price}</span>
          <p className="mt-4 text-lg">{data?.live?.description}</p>
        </div>
        <div>
          <h3 className="text-xl font-bold">Live Chat</h3>
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
                className="w-full rounded-full py-2 text-black shadow-sm"
                type="text"
              />
              <div className="absolute inset-y-0 right-0 pr-2">
                <button className="flex items-center rounded-full bg-green-300 py-2 px-3 text-sm text-black hover:bg-green-500">
                  &rarr;
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Live;
