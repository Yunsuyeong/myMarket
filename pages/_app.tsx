import type { AppProps } from "next/app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <Component {...pageProps} />
    </div>
  );
}
