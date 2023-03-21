import { NextPage } from "next";
import Layout from "../../components/layout";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post, User } from "@prisma/client";
import useCoords from "@libs/client/useCoords";
import Head from "next/head";

interface PostsWithUser extends Post {
  user: User;
  _count: {
    wonders: number;
    answers: number;
  };
}

interface IPostsREsponse {
  ok: boolean;
  posts: PostsWithUser[];
}

const Community: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { data } = useSWR<IPostsREsponse>(
    latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : null
  );
  console.log(latitude, longitude);
  return (
    <Layout title="Community" hasTabBar>
      <Head>
        <title>COMMUNITY</title>
      </Head>
      <div className="cursor-pointer space-y-6 px-4 py-12">
        {data?.posts?.map((post) => (
          <div
            onClick={() => router.push(`/community/${post.id}`)}
            key={post.id}
            className="flex flex-col items-start"
          >
            <h4
              className="text-md flex items-center rounded-full bg-white
          px-2 py-1 font-semibold text-black"
            >
              Question
            </h4>
            <div className="mt-3">
              <span className="text-lg font-bold text-yellow-500">Q. </span>
              {post.question}
            </div>
            <div className="mt-3 flex w-full items-center justify-between text-sm font-normal">
              <span>{post.user.name}</span>
              <span>{String(post.created)}</span>
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
                <p>Interesting {post._count.wonders}</p>
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
                <span>Answer {post._count.answers}</span>
              </span>
            </div>
          </div>
        ))}
        <button
          className="fixed bottom-24 right-5 cursor-pointer
          rounded-full bg-green-300 p-4 text-black shadow-xl transition-colors hover:bg-green-500"
          onClick={() => router.push("/community/post")}
        >
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
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>
        </button>
      </div>
    </Layout>
  );
};

export default Community;
