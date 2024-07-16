// pages/_app.tsx
import { AppProps } from 'next/app';
import '../app/globals.css';
import 'tailwindcss/tailwind.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import FilmBackground from '@/components/layouts/HomePage/FilmBackground';
import { getAnimationConfig, AnimationType } from '../utils/animations';
import { CustomNextPage } from '../types/next-page';
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { useState, useEffect } from 'react';
import Head from 'next/head';
// import customRouter from '../utils/customRouter';

type CustomAppProps = AppProps & {
  Component: CustomNextPage
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter()
  const animationType = Component.animationType || 'default'
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])

  const ContentWrapper = ({ children }: { children: React.ReactNode }) => {
    if (Component.noFilmBackground || isMobile) {
      return (
        <div className='bg-black min-h-screen flex flex-col justify-between'>
          <div className="flex-grow">{children}</div>
        </div>
      );
    }
    return <FilmBackground>{children}</FilmBackground>
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="description" content="MovieSagaは映画探しの手助けするサービスです。" />
        <meta property="og:title" content="MovieSaga" />
        <meta property="og:description" content="映画探しの手助けするサービスです。" />
        <meta property="og:url" content="https://movie-saga-app.com" />
        <meta property="og:image" content="https://movie-saga-app.com/logo.png" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MovieSaga" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@ganbaritaiman9" />
        <meta name="twitter:image" content="https://movie-saga-app.com//logo.png" />
        <link rel="canonical" href="https://movie-saga-app.com" />
        <link rel="icon" type="image/png" sizes="32x32" href="/MovieSaga_favicon.png" />
      </Head>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          {...getAnimationConfig(animationType)}
        >
          <Header />
          <ContentWrapper>
            <Component {...pageProps} />
          </ContentWrapper>
          <Footer />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default MyApp