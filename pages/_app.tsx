import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import { Loading } from '../components/shared/loading';
import { FullLoading } from '../components/shared/full-loading';
import PlausibleProvider from 'next-plausible';

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
    <div style={{marginLeft: 'auto', marginRight: 'auto', maxWidth: '1200px'}}>
      {loading ? (
        <FullLoading></FullLoading>
      ) : (
        <PlausibleProvider domain="cocktailrecipe.co">
          <Component {...pageProps} />
        </PlausibleProvider>
      )}
    </div>
  );
}

export default MyApp
