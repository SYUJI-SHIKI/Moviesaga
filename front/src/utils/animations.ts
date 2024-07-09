import { MotionProps } from 'framer-motion';

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
};

export function getAnimationConfig(type: AnimationType): AnimationConfig {
  return animations[type];
}