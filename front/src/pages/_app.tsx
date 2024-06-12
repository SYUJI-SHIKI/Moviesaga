import { AppProps } from 'next/app';
import  '../app/globals.css';
import 'tailwindcss/tailwind.css';
import RootLayout from '../app/layout';

function MyApp({ Component, pageProps }: AppProps){
  return(
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>);
};

export default MyApp;