import { MotionProps } from 'framer-motion';
// import { isNavigationBack } from './customRouter';

//  'none'の追加も忘れない
export type AnimationType = 'default' | 'fadeIn';

type AnimationConfig = {
  exit: MotionProps['exit'];
  animate: MotionProps['animate'];
  initial: MotionProps['initial'];
  transition?: MotionProps['transition'];
};

const animations: Record<AnimationType, AnimationConfig> = {
  default: {
    exit: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: -100 },
    transition: { duration: 1.5 },
  },
  fadeIn: {
    exit: { opacity: 0 },
    animate: { opacity: 1 },
    initial: { opacity: 0 },
    transition: { duration: 1 },
  },
  // none: {
  //   exit: { opacity: 1 },
  //   animate: { opacity: 1 },
  //   initial: { opacity: 1 },
  //   transition: { duration: 0 },
  // },
};

export function getAnimationConfig(type: AnimationType): AnimationConfig {
  // if (isNavigationBack()) {
  //   return animations.none;
  // }
  return animations[type];
}