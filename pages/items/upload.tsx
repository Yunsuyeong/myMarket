import { NextPage } from "next";
import Layout from "../../components/layout";
import { cls } from "@libs/client/utils";
import Button from "@components/button";
import { useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import Input from "@components/input";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { Product } from "@prisma/client";
import TextArea from "@components/textarea";

interface IItemForm {
  image: FileList;
  name: string;
  price: number;
  description: string;
}

interface UploadMutationResult {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, watch } = useForm<IItemForm>();
  const [upload, { loading, data }] =
    useMutation<UploadMutationResult>("/api/items");
  const onValid = async ({ image, name, price, description }: IItemForm) => {
    if (loading) return;
    if (image && image.length > 0) {
      const { uploadURL } = await (await fetch(`/api/items`)).json();
      const form = new FormData();
      form.append("file", image[0], name);
      const {
        result: { id },
      } = await (
        await fetch(uploadURL, {
          method: "POST",
          body: form,
        })
      ).json();
      return;
      upload({ imageId: id, name, price, description });
    } else {
      upload({ name, price, description });
    }
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/items/${data.product.id}`);
    }
  }, [data, router]);
  const [preview, setPreview] = useState("");
  const image = watch("image");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setPreview(URL.createObjectURL(file));
    }
  }, [image]);
  return (
    <Layout canGoBack>
      <div>
        <form className="px-4 py-8" onSubmit={handleSubmit(onValid)}>
          <div>
            {preview ? (
              <img src={preview} className="mb-4 h-48 w-full rounded-md py-4" />
            ) : (
              <label className="mb-4 flex aspect-video w-full cursor-pointer items-center justify-center rounded-md border-2 border-dashed py-4 hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-12 w-12"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <input
                  accept="image/*"
                  {...register("image")}
                  className="hidden"
                  type="file"
                />
              </label>
            )}
          </div>
          <Input
            register={register("name", { required: true })}
            required
            label="Name"
            name="name"
            type="text"
          />
          <Input
            register={register("price", { required: true })}
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
          <Button method="upload" text={loading ? "Loading..." : "Upload"} />
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
