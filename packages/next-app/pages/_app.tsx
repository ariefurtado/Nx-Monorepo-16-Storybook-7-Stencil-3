import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { useEffect } from 'react';
import loadComponentLibrary from '../utils/load-component-lib';

function CustomApp({ Component, pageProps }: AppProps) {

  useEffect(() => {
    loadComponentLibrary();
  }, []);

  return (
    <>
      <Head>
        <title>Welcome to next-app!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
