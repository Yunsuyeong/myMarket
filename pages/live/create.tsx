import Button from "@components/button";
import Input from "@components/input";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Live } from "@prisma/client";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";

interface ICreateForm {
  name: string;
  price: number;
  description: string;
}

interface ICreateResponse {
  ok: boolean;
  live: Live;
}

const CreateLive: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ICreateForm>();
  const [create, { data, loading }] =
    useMutation<ICreateResponse>("/api/lives");
  const onValid = (form: ICreateForm) => {
    if (loading) return;
    create(form);
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/live/${data.live.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="Create Live" canGoBack>
      <Head>
        <title>LIVE | CREATE</title>
      </Head>
      <div>
        <form
          onSubmit={handleSubmit(onValid)}
          className="px-4 py-8 sm:absolute sm:top-[10vh] sm:left-0 sm:right-0 sm:w-2/3"
        >
          <Input
            register={register("name", { required: true })}
            required
            label="Name"
            name="name"
            type="text"
          />
          <Input
            register={register("price", {
              required: true,
              valueAsNumber: true,
            })}
            required
            label="Price"
            name="price"
            type="text"
            kind="price"
          />
          <TextArea
            register={register("description", { required: true })}
            name="description"
            label="Description"
            required
          />
          <Button
            method="upload"
            text={loading ? "Loading..." : "Create Live"}
          />
        </form>
      </div>
    </Layout>
  );
};

export default CreateLive;
