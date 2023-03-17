import { ItemWithCount } from "pages";
import useSWR from "swr";

interface ItemListProps {
  kind: "sales" | "buys" | "favorites";
}

interface Record {
  id: number;
  product: ItemWithCount;
}

interface IRecordResponse {
  [key: string]: Record[];
}

const ItemList = ({ kind }: ItemListProps) => {
  const { data } = useSWR<IRecordResponse>(`/api/users/prof/${kind}`);
  return data ? (
    <>
      {data[kind]?.map((record) => (
        <div
          key={record.product.id}
          className="flex cursor-pointer justify-between border-b pb-4"
        >
          <div className="flex space-x-2">
            <div className="h-16 w-16 rounded-sm bg-white shadow-sm" />
            <div className="flex flex-col pl-2">
              <h3 className="text-md font-semibold">{record.product.image}</h3>
              <span className="text-sm font-medium">black</span>
              <span className="text-sm font-medium text-gray-300">
                {" "}
                $ {record.product.price}
              </span>
            </div>
          </div>
          <div className="flex items-end justify-end space-x-1">
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
              <span className="text-white">
                {record.product._count.favorites}
              </span>
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
    </>
  ) : null;
};

export default ItemList;
