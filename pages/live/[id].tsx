import { NextPage } from "next";
import Layout from "../../components/layout";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Live } from "@prisma/client";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { useEffect } from "react";
import Head from "next/head";

interface ILiveMessage {
  id: number;
  message: string;
  user: {
    id: number;
    avatar?: string;
  };
}

interface LiveWithMessages extends Live {
  messages: ILiveMessage[];
}

interface ILiveResponse {
  ok: true;
  live: LiveWithMessages;
}

interface IMessageForm {
  message: string;
}

const LiveDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<ILiveResponse>(
    router.query.id && `/api/lives/${router.query.id}?page=1`,
    {
      refreshInterval: 1000,
    }
  );
  const { handleSubmit, register, reset } = useForm<IMessageForm>();
  const [message, { data: messageData, loading }] = useMutation(
    `/api/lives/${router.query.id}/messages`
  );
  const onValid = (form: IMessageForm) => {
    if (loading) return;
    reset();
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          live: {
            ...prev.live,
            messages: [
              ...prev.live.messages,
              {
                id: Date.now(),
                message: form.message,
                user: {
                  ...user,
                },
              },
            ],
          },
        } as any),
      false
    );
    // message(form);
  };
  return (
    <Layout canGoBack>
      <Head>
        <title>LIVE | {data?.live?.name}</title>
      </Head>
      <div className="space-x-2 px-2 py-8">
        <div className="aspect-video w-full rounded-md bg-slate-300 shadow-sm">
          {data?.live?.cloudflareId ? (
            <iframe
              src={`https://iframe.videodelivery.net/${data?.live?.cloudflareId}`}
              className="aspect-video w-full rounded-md shadow-sm"
              height="720"
              width="1280"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-ficture;"
              allowFullScreen={true}
            ></iframe>
          ) : null}
        </div>
        <div>
          <h3 className="mt-2 text-center text-2xl font-bold">
            {data?.live?.name}
          </h3>
          <span className="mt-2 block text-xl">{data?.live?.price}</span>
          <p className="mt-4 text-lg">{data?.live?.description}</p>
          <div className="flex flex-col rounded-lg bg-yellow-300 p-4 text-black">
            <span>Stream keys (Secret)</span>
            <span>
              <span>URL</span>:{" "}
              {data?.live?.cloudflareUrl ? data.live.cloudflareUrl : "xxxxx"}
            </span>
            <span>
              <span>Key</span>:{" "}
              {data?.live.cloudflareKey ? data.live.cloudflareKey : "xxxxx"}
            </span>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-bold">Live Chat</h3>
          {data?.live.messages.map((message) =>
            message.user.id !== user?.id ? (
              <div key={message.id} className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-slate-300" />
                <div className="text-md w-1/2 rounded-md border p-2 font-semibold">
                  <p>{message.message}</p>
                </div>
              </div>
            ) : (
              <div
                key={message.id}
                className="flex flex-row-reverse items-center space-x-2 space-x-reverse"
              >
                <div className="h-8 w-8 rounded-full bg-slate-300" />
                <div className="text-md w-1/2 rounded-md border p-2 font-semibold">
                  <p>{message.message}</p>
                </div>
              </div>
            )
          )}
          <form
            onSubmit={handleSubmit(onValid)}
            className="fixed inset-x-0 bottom-0 mx-auto w-full max-w-md"
          >
            <div className="relative mx-auto flex w-full max-w-md items-center">
              <input
                {...register("message", { required: true })}
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

export default LiveDetail;
