import Button from "@components/button";
import { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Answer, Post, User } from "@prisma/client";
import Link from "next/link";

interface AnswerwithUser extends Answer {
  user: User;
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    answers: number;
    wonders: number;
  };
  answers: AnswerwithUser[];
}

interface IPostResponse {
  ok: boolean;
  post: PostWithUser;
}

const CommunityDetail: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<IPostResponse>(
    router.query.id && `/api/posts/${router.query.id}`
  );
  console.log(data);
  return (
    <Layout canGoBack>
      <div>
        <h4
          className="text-md mb-3 inline-flex items-center rounded-full bg-white
          px-2 py-1 font-semibold text-black"
        >
          Question
        </h4>
        <div className="flex items-center space-x-4 border-b px-2 py-2">
          <div className="h-12 w-12 rounded-full bg-gray-400" />
          <div>
            <p className="text-md font-semibold">{data?.post?.user?.name}</p>
            <Link
              legacyBehavior
              href={`/users/profiles/${data?.post?.user?.id}`}
            >
              <a className="text-sm font-medium">view profile &rarr;</a>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-3 px-2">
            <span className="text-lg font-bold text-yellow-500">Q. </span>
            {data?.post?.question}
          </div>
          <div className="mt-3 flex w-full space-x-3 border-t-[0.5px] border-b py-3">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Interesting {data?.post?._count?.wonders}</p>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"
                />
              </svg>
              <span>Answer {data?.post?._count?.answers}</span>
            </span>
          </div>
          <div className="my-3 space-y-2 px-2">
            {data?.post?.answers.map((answer) => (
              <div key={answer.id} className="flex items-start space-x-2">
                <div className="h-8 w-8 rounded-full bg-slate-300" />
                <div>
                  <span className="text-md block font-medium">
                    {answer.user.name}
                  </span>
                  <span className="block text-sm font-normal text-gray-300">
                    {answer.created as any}
                  </span>
                  <span className="block">{answer.answer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="px-2">
          <textarea className="mt-1 w-full rounded-md border-gray-300 text-black shadow-sm focus:border-orange-500 focus:ring-orange-500 " />
          <Button text="Reply" method="upload" />
        </div>
      </div>
    </Layout>
  );
};

export default CommunityDetail;
