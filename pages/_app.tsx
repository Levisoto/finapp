import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import "./styles.css";

function CustomApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <>
      <Head>
        <title>Welcome to finapp!</title>
      </Head>
      <main className="app">
        <SessionProvider session={session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </main>
    </>
  );
}

export default CustomApp;
