import { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import { Live } from "@prisma/client";
import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

interface ILivesResponse {
  ok: boolean;
  lives: Live[];
}

const Lives: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<ILivesResponse>("/api/lives?page=1");
  return (
    <Layout title="Stream" hasTabBar>
      <Head>
        <title>LIVE</title>
      </Head>
      <div className="space-x-2 divide-y-[1px] py-8">
        {data?.lives.map((live) => (
          <Link legacyBehavior key={live.id} href={`/live/${live.id}`}>
            <a className="block px-4 pt-4">
              {live.cloudflareId ? (
                <div className="relative aspect-video w-full rounded-md shadow-sm">
                  <Image
                    layout="fill"
                    alt=""
                    src={`https://videodelivery.net/${live.cloudflareId}/
              thumbnails/thumbnail.jpg?height=320`}
                  />
                </div>
              ) : (
                <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm" />
              )}
              <h3 className="mt-2 text-lg font-semibold">{live.name}</h3>
            </a>
          </Link>
        ))}
        <button
          onClick={() => router.push("/live/create")}
          className="fixed bottom-24 right-5 cursor-pointer
          rounded-full bg-green-300 p-4 text-black shadow-xl transition-colors hover:bg-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Lives;
