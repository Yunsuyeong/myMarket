import type { AppProps } from "next/app";
import "../styles/globals.css";
import { SWRConfig } from "swr";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 1000,
        fetcher: (url: string) => fetch(url).then((res) => res.json()),
      }}
    >
      <div className="mx-auto w-full max-w-2xl">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
