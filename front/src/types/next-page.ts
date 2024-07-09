// types/next-page.ts
import { NextPage } from 'next'
import { AnimationType } from '../utils/animations'

export type CustomNextPage = NextPage & {
  noFilmBackground?: boolean
  animationType?: AnimationType
}