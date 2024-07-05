import { AppProps } from 'next/app';
import  '../app/globals.css';
import 'tailwindcss/tailwind.css';
import RootLayout from '../app/layout';
import Head from 'next/head';
import Link from 'next/link'

function MyApp({ Component, pageProps }: AppProps){
  return(
    <>
      <Head>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" />
        <Link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
      </Head>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>  
    </>
  );
};

export default MyApp;