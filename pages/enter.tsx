import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import useMutation from "@libs/client/useMutation";
import { cls } from "@libs/client/utils";

interface IForm {
  email?: string;
  phone?: number;
}

export default function Enter() {
  const [enter, { loading, data, error }] = useMutation("/api/users/enter");
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm<IForm>();
  const onValid = (data: IForm) => {
    enter(data);
  };
  console.log(loading, data, error);
  const [method, setMethod] = useState<"email" | "phone">("email");
  const onEmailClick = () => {
    reset();
    setMethod("email");
  };
  const onPhoneClick = () => {
    reset();
    setMethod("phone");
  };
  return (
    <div className="mt-8 px-4">
      <h1 className="text-center text-4xl font-bold">Enter to my market</h1>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h3 className=" text-lg font-medium">Enter using</h3>
          <div className="mt-4 grid w-full grid-cols-2 gap-12 border-b">
            <button
              className={cls(
                "cursor-pointer border-b-2 pb-2 font-semibold",
                method === "email"
                  ? " border-green-500 text-green-200"
                  : "border-transparent"
              )}
              onClick={onEmailClick}
            >
              Email address
            </button>
            <button
              className={cls(
                "cursor-pointer border-b-2 pb-2 font-semibold",
                method === "phone"
                  ? "border-b-2 border-yellow-500 text-yellow-200"
                  : "border-transparent"
              )}
              onClick={onPhoneClick}
            >
              Phone number
            </button>
          </div>
        </div>
        <form onSubmit={handleSubmit(onValid)} className="mt-4 flex flex-col">
          <label className="text-sm font-medium">
            {method === "email" && "Email address"}
            {method === "phone" && "Phone number"}
          </label>
          <div className="mt-2">
            {method === "email" ? (
              <input
                className="placehoder-gray-200 w-full appearance-none rounded-md border-white px-3
                py-2 text-black shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                type="email"
                placeholder="Email"
                required
                {...register("email", { required: "Email is required." })}
              />
            ) : null}
            {method === "phone" ? (
              <div className="flex rounded-md shadow-sm">
                <span
                  className="bg-grey-200 flex items-center
                justify-center rounded-l-md border border-r-0 px-4"
                >
                  +82
                </span>
                <input
                  className="placehoder-gray-200 w-full appearance-none rounded-md border-white px-3
                py-2 text-black shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                  type="number"
                  placeholder="Phone number"
                  required
                  {...register("phone", {
                    minLength: {
                      message:
                        "Phone number must be at least 9 characters long.",
                      value: 9,
                    },
                  })}
                />
              </div>
            ) : null}
          </div>
          <button
            className={cls(
              "text-md border-border-transparent rounded-mdpx-4 mt-2 cursor-pointer py-2 font-bold shadow-sm",
              method === "email"
                ? "bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                : method === "phone"
                ? "bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                : ""
            )}
          >
            {method === "email" ? "Get login link" : null}
            {method === "phone" ? "Get one-time password" : null}
          </button>
        </form>
        <div className="mt-4">
          <div className="relative">
            <div className="absolute w-full border-t border-white" />
            <div className="relative -top-3 text-center">
              <span className="text-md bg-black px-1">Or enter with</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <button
              className="text-md flex cursor-pointer items-center justify-center
            rounded-md border border-white px-2 py-2 font-bold 
            text-white shadow-sm hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button
              className="text-md flex cursor-pointer items-center justify-center
            rounded-md border border-white px-2 py-2 font-bold 
            text-white shadow-sm hover:bg-gray-700"
            >
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
