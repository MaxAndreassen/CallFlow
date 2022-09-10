import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '../components/shared/loading';
import { FullLoading } from '../components/shared/full-loading';

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <>
      {loading ? (
        <FullLoading></FullLoading>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}

export default MyApp
