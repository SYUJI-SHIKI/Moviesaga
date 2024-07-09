// pages/_app.tsx
import { AppProps } from 'next/app'
import '../app/globals.css'
import 'tailwindcss/tailwind.css'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/router'
import RootLayout from '../app/layout'
import FilmBackground from '@/components/layouts/HomePage/FilmBackground'
import { getAnimationConfig, AnimationType } from '../utils/animations'
import { CustomNextPage } from '../types/next-page'

type CustomAppProps = AppProps & {
  Component: CustomNextPage
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const router = useRouter()
  const animationType = Component.animationType || 'default'

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        {...getAnimationConfig(animationType)}
      >
        <RootLayout>
          {Component.noFilmBackground ? (
            <Component {...pageProps} />
          ) : (
            <FilmBackground>
              <Component {...pageProps} />
            </FilmBackground>
          )}
        </RootLayout>
      </motion.div>
    </AnimatePresence>
  )
}

export default MyApp