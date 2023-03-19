import Button from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { Product, User } from "@prisma/client";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface ItemWithUser extends Product {
  user: User;
}

interface IItemResponse {
  ok: boolean;
  item: ItemWithUser;
  relatedItem: Product[];
  isLiked: boolean;
}

interface IEditItemForm {
  image: FileList;
  name: string;
  price: number;
  description: string;
}

const EditItem: NextPage = () => {
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<IItemResponse>(
    router.query.id && `/api/items/${router.query.id}`
  );
  const { register, handleSubmit, setValue, watch } = useForm<IEditItemForm>();
  useEffect(() => {
    if (data?.item?.name) setValue("name", data.item.name);
    if (data?.item?.price) setValue("price", data.item.price);
    if (data?.item?.description) setValue("description", data.item.description);
  }, [data, setValue]);
  const [edititem, { data: editData, loading }] = useMutation(
    `/api/items/${router.query.id}`
  );
  const onValid = ({ image, name, price, description }: IEditItemForm) => {
    return;
    if (loading) return;
    edititem({ name, price, description });
  };
  useEffect(() => {
    if (editData?.ok) {
      router.push(`/items/${router.query.id}`);
    }
  }, [editData, router]);
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
      <form onSubmit={handleSubmit(onValid)} className="space-y-2 px-2 py-8">
        <div className="flex flex-col items-center justify-center gap-4">
          {preview ? (
            <img src={preview} className="h-36 w-36 rounded-md" />
          ) : (
            <div className="h-36 w-36 rounded-md bg-slate-300" />
          )}
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-500 py-2
          px-2 text-sm font-medium shadow-sm hover:bg-gray-600 focus:ring-2 focus:ring-offset-2
          "
          >
            Change
            <input
              {...register("image")}
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <Input
          register={register("name", { required: true })}
          name="name"
          label="Name"
          type="text"
          required
        />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          name="price"
          label="Price"
          type="number"
          required
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="Description"
          required
        />
        {/* {errors.formErrors ? (
          <span className="my-2 text-2xl font-extrabold text-red-500">
            {errors.formErrors.message}
          </span>
        ) : null} */}
        <Button method="upload" text={loading ? "Loading..." : "Edit Item"} />
      </form>
    </Layout>
  );
};

export default EditItem;
