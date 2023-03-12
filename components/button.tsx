import { cls } from "../libs/client/utils";

interface IButton {
  large?: boolean;
  method: string;
  text: string;
  [key: string]: any;
}

const Button = ({
  large = false,
  method = "email",
  onClick,
  text,
  ...rest
}: IButton) => {
  return (
    <button
      {...rest}
      className={cls(
        "text-md border-border-transparent mt-2 cursor-pointer rounded-md px-4 py-2 font-bold shadow-sm",
        large ? "py-3 text-base" : "py-2 text-sm",
        method === "email"
          ? "bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          : method === "phone"
          ? "bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          : method === "upload"
          ? "mt-2 w-full bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          : ""
      )}
    >
      {text}
    </button>
  );
};

export default Button;
