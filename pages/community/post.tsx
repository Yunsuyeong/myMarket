import Button from "@components/button";
import { NextPage } from "next";
import Layout from "../../components/layout";
import { useForm } from "react-hook-form";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Post } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useCoords from "@libs/client/useCoords";
import Head from "next/head";

interface IPostForm {
  question: string;
}

interface PostMutationResult {
  ok: boolean;
  post: Post;
}

const CommunityPost: NextPage = () => {
  const { latitude, longitude } = useCoords();
  const router = useRouter();
  const { register, handleSubmit } = useForm<IPostForm>();
  const [post, { loading, data }] =
    useMutation<PostMutationResult>("/api/posts");
  const onValid = (form: IPostForm) => {
    if (loading) return;
    post({ ...form, latitude, longitude });
  };
  useEffect(() => {
    if (data && data?.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);
  return (
    <Layout canGoBack>
      <Head>
        <title>COMMUNITY | POST</title>
      </Head>
      <form onSubmit={handleSubmit(onValid)} className="px-2">
        <TextArea
          register={register("question", { required: true })}
          required
          placeholder="Ask a question!"
        />
        <Button text={loading ? "Loading..." : "Post"} method="upload" />
      </form>
    </Layout>
  );
};

export default CommunityPost;
