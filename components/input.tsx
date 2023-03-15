import { UseFormRegisterReturn } from "react-hook-form";

interface IInput {
  label: string;
  name: string;
  type: string;
  required: boolean;
  register?: UseFormRegisterReturn;
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
      {kind === "price" && (
        <div className="relative flex items-center rounded-md shadow-sm">
          <div className="pointer-events-none absolute left-0 flex items-center justify-center pl-3">
            <span className="text-sm text-gray-500">$</span>
          </div>
          <input
            id={name}
            required={required}
            {...register}
            type={type}
            className="w-full appearance-none px-2 py-2 pl-6 text-black"
          />
          <div className="pointer-events-none absolute right-0 flex items-center pr-3">
            <span className="text-black">USD</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Input;
