import { AppProps } from 'next/app';
import { NextComponentType, NextPageContext } from 'next';
import  '../app/globals.css';
import 'tailwindcss/tailwind.css';
import RootLayout from '../app/layout';
import Head from 'next/head';
import Link from 'next/link'
import FilmBackground from '@/components/layouts/HomePage/FilmBackground';

type MyAppProps = AppProps & {
  Component: NextComponentType<NextPageContext, any, any> & {
    noFilmBackground?: boolean;
  };
};

function MyApp({ Component, pageProps }: MyAppProps){
  return(
    <>
      <Head>
        <Link rel="preconnect" href="https://fonts.googleapis.com" />
        <Link rel="preconnect" href="https://fonts.gstatic.com" />
        <Link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
      </Head>
      <RootLayout>
        {Component.noFilmBackground ? (
          <Component {...pageProps} />
        ) : (
          <FilmBackground>
            <Component {...pageProps} />
          </FilmBackground>
        )}
      </RootLayout>  
    </>
  );
};

export default MyApp;