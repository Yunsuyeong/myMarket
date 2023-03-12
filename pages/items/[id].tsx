import { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";

interface ItemWithUser extends Product {
  user: User;
}

interface IItemResponse {
  ok: boolean;
  item: ItemWithUser;
  relatedItem: Product[];
}

const ItemDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<IItemResponse>(
    router.query.id && `/api/items/${router.query.id}`
  );
  console.log(data);
  return (
    <Layout canGoBack>
      <div className="px-4 py-8">
        <div className="mb-4">
          <div className="h-96 bg-white" />
          <div className="flex items-center space-x-4 border-t border-b py-2">
            <div className="h-16 w-16 rounded-full bg-gray-400" />
            <div>
              <p className="text-md font-semibold">{data?.item?.user?.name}</p>
              <Link
                legacyBehavior
                href={`/users/profiles/${data?.item?.user?.id}`}
              >
                <a className="text-sm font-medium">view profile &rarr;</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h1 className="text-2xl font-bold">
            {data ? data?.item?.name : "Loading..."}
          </h1>
          <p className="text-sm font-medium text-gray-300">
            ${data ? data?.item?.price : "Loading..."}
          </p>
          <p className="my-2 text-sm font-medium">
            {data ? data?.item?.description : "Loading..."}
          </p>
          <p className="my-2 text-sm font-normal">
            {data ? (data?.item?.created as any) : "Loading..."}
          </p>
          <div className="flex items-center justify-between space-x-2">
            <button
              className="flex-1 rounded-md bg-green-300 py-2 font-semibold
            shadow-sm hover:bg-green-500 focus:ring-2 focus:ring-offset-2"
            >
              talk to seller
            </button>
            <button className="flex items-center justify-center rounded-md p-2 hover:bg-gray-500">
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
            </button>
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
      </div>
    </Layout>
  );
};

export default ItemDetail;
