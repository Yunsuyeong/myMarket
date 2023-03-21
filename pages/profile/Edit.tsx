import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";
import Image from "next/image";

interface IEditForm {
  name?: string;
  email?: string;
  phone?: number;
  avatar?: FileList;
  formErrors?: string;
}

interface IEditResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors },
  } = useForm<IEditForm>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", +user.phone);
    if (user?.avatar)
      setPreview(`https://imagedelivery.net/aSbksvJjax-AUC7qVnaC4A/
          ${user?.avatar}/avatar`);
  }, [user, setValue]);
  const [edit, { loading, data }] =
    useMutation<IEditResponse>(`/api/users/prof`);
  const onValid = async ({ name, email, phone, avatar }: IEditForm) => {
    if (loading) return;
    if (name === "" && email === "" && phone === +"") {
      return setError("formErrors", { message: "Email or Phone are required" });
    }
    if (avatar && avatar.length > 0 && user) {
      const { uploadURL } = await (await fetch(`/api/files`)).json();
      const form = new FormData();
      form.append("file", avatar[0], user?.id + "");
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      return;
      edit({
        email,
        phone,
        name,
        avatarId: id,
      });
    } else {
      edit({ email, phone, name });
    }
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  const [preview, setPreview] = useState("");
  const avatar = watch("avatar");
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      const file = avatar[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [avatar]);
  useEffect(() => {
    if (data?.ok) {
      router.push("/profile");
    }
  }, [data, router]);
  return (
    <Layout canGoBack>
      <Head>
        <title>PROFILE | EDIT</title>
      </Head>
      <form onSubmit={handleSubmit(onValid)} className="space-y-2 px-2 py-8">
        <div className="flex items-center space-x-2">
          {preview ? (
            <Image
              src={preview}
              width={96}
              height={96}
              alt=""
              quality={100}
              className="h-24 w-24 rounded-full"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-slate-300" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-500 py-2
          px-2 text-sm font-medium shadow-sm hover:bg-gray-600 focus:ring-2 focus:ring-offset-2
          "
          >
            Change
            <input
              {...register("avatar")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name")}
          name="name"
          label="Name"
          type="text"
          required={false}
        />
        <Input
          register={register("email")}
          name="email"
          label="Email address"
          type="email"
          required={false}
        />
        <Input
          register={register("phone")}
          name="phone"
          label="Phone number"
          kind="phone"
          type="number"
          required={false}
        />
        {errors.formErrors ? (
          <span className="my-2 text-2xl font-extrabold text-red-500">
            {errors.formErrors.message}
          </span>
        ) : null}
        <Button
          method="upload"
          text={loading ? "Loading..." : "Edit Profile"}
        />
      </form>
    </Layout>
  );
};

export default EditProfile;
