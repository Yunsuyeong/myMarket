import { NextPage } from "next";
import Layout from "../../../components/layout";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, Register, User } from "@prisma/client";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";
import useUser from "@libs/client/useUser";
import Head from "next/head";
import Image from "next/image";

interface IItemContacts {
  id: number;
  contact: string;
  user: {
    id: number;
    avatar: string;
  };
}

interface ItemWithContacts extends Product {
  user: User;
  registers: IItemContacts[];
}

interface IItemResponse {
  ok: boolean;
  item: ItemWithContacts;
  relatedItem: Product[];
  isLiked: boolean;
  Registered: boolean;
}

const ItemDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<IItemResponse>(
    router.query.id && `/api/items/${router.query.id}`
  );
  const [fav] = useMutation(`/api/items/${router.query.id}/fav`);
  const onFavClick = () => {
    if (!data) return;
    boundMutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
    // mutate("/api/users/prof", (prev: any) => ({ ok: !prev.ok }), false);
    fav({});
  };
  return (
    <Layout canGoBack>
      <Head>
        <title>PRODUCT | {data?.item?.name}</title>
      </Head>
      <div className="px-4 py-8 sm:absolute sm:left-0 sm:right-0 sm:w-full">
        <div className="sm:grid sm:grid-cols-2 sm:gap-8">
          <div className="mb-4">
            {data?.item?.image ? (
              <div className="relative pb-80">
                <Image
                  src={`https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/
          ${data?.item?.image}/image`}
                  layout="fill"
                  quality={100}
                  alt=""
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="h-96 w-96 bg-white" />
            )}
            <div className="flex items-center space-x-4 border-b py-2">
              {data?.item?.user?.avatar ? (
                <Image
                  src={`https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/
          ${data?.item?.user?.avatar}/avatar`}
                  className="rounded-full"
                  width={64}
                  height={64}
                  quality={100}
                  alt=""
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-400" />
              )}
              <div>
                <p className="text-md font-semibold">
                  {data?.item?.user?.name}
                </p>
                <Link legacyBehavior href={`/profiles/${data?.item?.user?.id}`}>
                  <a className="text-sm font-medium">view profile &rarr;</a>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:flex sm:flex-col sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">
                {data ? data?.item?.name : "Loading..."}{" "}
                <span className="text-sm font-medium">
                  ({data?.Registered ? "Registered" : "Not Registered"})
                </span>
              </h1>
              <p className="text-sm font-medium text-gray-300">
                ${data ? data?.item?.price : "Loading..."}
              </p>
              <p className="my-2 text-sm font-medium">
                {data ? data?.item?.description : "Loading..."}
              </p>
              <p className="my-2 text-sm font-normal">
                Created : {data ? String(data?.item?.created) : "Loading..."}
              </p>
              <p className="my-2 text-sm font-normal">
                Updated : {data ? String(data?.item?.updated) : "Loading..."}
              </p>
            </div>
            <div>
              <button
                onClick={() => router.push(`/items/${router.query.id}/edit`)}
                className="mb-2 w-full flex-1 rounded-md bg-yellow-300 py-2
            font-semibold shadow-sm hover:bg-yellow-500 focus:ring-2 focus:ring-offset-2"
              >
                Edit this Item
              </button>
              <div className="flex items-center justify-between space-x-2">
                <button
                  onClick={() =>
                    router.push(`/items/${router.query.id}/register`)
                  }
                  className="flex-1 rounded-md bg-green-300 py-2 font-semibold
            shadow-sm hover:bg-green-500 focus:ring-2 focus:ring-offset-2"
                >
                  talk to seller
                </button>
                <button
                  onClick={onFavClick}
                  className={cls(
                    "flex items-center justify-center rounded-md p-2",
                    data?.isLiked
                      ? "text-red-500 hover:bg-red-500"
                      : "text-gray-500 hover:bg-gray-500"
                  )}
                >
                  {data?.isLiked ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 sm:h-5 sm:w-5"
                    >
                      <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                  ) : (
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
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-semibold">similar</h2>
          <div className="grid grid-cols-2 gap-4">
            {data?.relatedItem?.map((item) => (
              <div key={item.id}>
                <div className="mb-2 h-48 w-full bg-white" />
                <h3 className="text-md font-medium">{item.name}</h3>
                <p className="text-sm font-medium text-gray-300">
                  ${item.price}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="py-4 text-2xl font-semibold">Contacts</h2>
          {data?.item?.registers.map((contact) =>
            contact.user.id !== user?.id ? (
              <div
                key={contact.id}
                className="flex items-center space-x-2 space-y-2"
              >
                <div className="h-8 w-8 rounded-full bg-slate-300" />
                <div className="text-md w-1/2 rounded-md border p-2 font-semibold">
                  <p>{contact.contact}</p>
                </div>
              </div>
            ) : (
              <div
                key={contact.id}
                className="flex flex-row-reverse items-center space-x-2 space-y-2 space-x-reverse"
              >
                <div className="h-8 w-8 rounded-full bg-slate-300" />
                <div className="text-md w-1/2 rounded-md border p-2 font-semibold">
                  <p>{contact.contact}</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
