import Button from "@components/button";
import Input from "@components/input";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Layout from "../../components/layout";

interface IEditForm {
  name?: string;
  email?: string;
  phone?: number;
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
    formState: { errors },
  } = useForm<IEditForm>();
  useEffect(() => {
    if (user?.name) setValue("name", user.name);
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", +user.phone);
  }, [user, setValue]);
  const [edit, { loading, data }] =
    useMutation<IEditResponse>(`/api/users/prof`);
  const onValid = ({ name, email, phone }: IEditForm) => {
    if (loading) return;
    if (name === "" && email === "" && phone === +"") {
      return setError("formErrors", { message: "Email or Phone are required" });
    }
    edit({ email, phone, name });
  };
  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError("formErrors", { message: data.error });
    }
  }, [data, setError]);
  useEffect(() => {
    if (data?.ok) {
      router.push("/profile");
    }
  }, [data, router]);
  return (
    <Layout canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="space-y-2 px-2 py-8">
        <div className="flex items-center space-x-2">
          <div className="h-12 w-12 rounded-full bg-slate-300" />
          <label
            htmlFor="picture"
            className="cursor-pointer rounded-md border border-gray-500 py-2
          px-2 text-sm font-medium shadow-sm hover:bg-gray-600 focus:ring-2 focus:ring-offset-2
          "
          >
            Change
            <input
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
