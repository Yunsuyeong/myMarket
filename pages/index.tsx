import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import Layout from "../components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Product, Register } from "@prisma/client";
import Image from "next/image";
import img from "../public/local.jpeg";
import Head from "next/head";

export interface ItemWithCount extends Product {
  _count: {
    favorites: number;
  };
  registers: Register[];
}

interface IItemssResponse {
  ok: boolean;
  items: ItemWithCount[];
}

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const { data } = useSWR<IItemssResponse>("/api/items");
  console.log(data);
  const router = useRouter();
  return (
    <Layout title="Home" hasTabBar>
      <Head>
        <title>HOME</title>
      </Head>
      <div className="flex flex-col space-y-5 px-2 py-4">
        {data?.items?.map((item) => (
          <div
            key={item.id}
            onClick={() => router.push(`/items/${item.id}`)}
            className="flex cursor-pointer justify-between border-b pb-4"
          >
            <div className="flex space-x-2">
              <Image src={img} width={64} height={64} alt="" quality={100} />
              {/* <div className="h-16 w-16 rounded-sm bg-white shadow-sm" /> */}
              <div className="flex flex-col pl-2">
                <h3 className="text-md font-semibold">{item.name}</h3>
                <span className="text-sm font-medium">Color</span>
                <span className="text-sm font-medium text-gray-300">
                  {" "}
                  $ {item.price}
                </span>
              </div>
            </div>
            <div className="flex items-end justify-end space-x-2">
              <div className="flex items-center space-x-1 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                <span>{item.registers.length !== 0 ? "O" : "X"}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                <span className="text-white">{item._count.favorites}</span>
              </div>
              <div className="flex items-center space-x-1 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-3 w-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
                <span>1</span>
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => router.push("/items/upload")}
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

export default Home;
