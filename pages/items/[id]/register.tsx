import Button from "@components/button";
import { NextPage } from "next";
import { useForm } from "react-hook-form";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import { Product, User } from "@prisma/client";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from "next/head";
import Layout from "@components/layout";

interface ItemWithUser extends Product {
  user: User;
}

interface IItemResponse {
  ok: boolean;
  item: ItemWithUser;
  relatedItem: Product[];
  isLiked: boolean;
}

interface IRegisterForm {
  contact: string;
}

const Register: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<IItemResponse>(
    router.query.id && `/api/items/${router.query.id}`
  );
  const { register, handleSubmit } = useForm<IRegisterForm>();
  const [regist, { data: registerData, loading }] = useMutation(
    `/api/items/${router.query.id}/contacts`
  );
  console.log(registerData);
  const onValid = (form: IRegisterForm) => {
    console.log(form);
    regist(form);
  };
  useEffect(() => {
    if (registerData?.ok) {
      router.push(`/items/${router.query.id}`);
    }
  });
  return (
    <Layout canGoBack>
      <Head>
        <title>{data?.item.name} | REGISTER</title>
      </Head>
      <form onClick={handleSubmit(onValid)} className="px-2">
        <TextArea
          register={register("contact", { required: true })}
          required
          placeholder="Leave a message."
        />
        <Button text={loading ? "Loading..." : "Register"} method="upload" />
      </form>
    </Layout>
  );
};

export default Register;
