import { UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  label: string;
  name: string;
  type: string;
  required: boolean;
  register: UseFormRegisterReturn;
  kind?: "email" | "phone" | "price";
  [key: string]: any;
}

const Input = ({
  label,
  name,
  kind = "email",
  register,
  type,
  required,
}: IInput) => {
  return (
    <div>
      <label className="block text-sm font-medium" htmlFor={name}>
        {label}
      </label>
      {kind === "email" && (
        <div className="relative flex items-center rounded-md shadow-sm">
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder="Email"
            className="placehoder-gray-200 w-full appearance-none rounded-md border-white px-3 py-2 text-black shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
          />
        </div>
      )}
      {kind === "phone" && (
        <div className="flex rounded-md shadow-sm">
          <span
            className="bg-grey-200 flex items-center
                justify-center rounded-l-md border border-r-0 px-4"
          >
            +82
          </span>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            placeholder="Phone number"
            className="placehoder-gray-200 w-full appearance-none rounded-md border-white px-3
                py-2 text-black shadow-sm focus:border-yellow-500 focus:outline-none focus:ring-yellow-500"
          />
        </div>
      )}
    </div>
  );
};

export default Input;
