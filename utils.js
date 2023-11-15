export const container = {
  hidden: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      ease: "easeIn",
      delayChildren: 0.3,
      staggerChildren: 0.6,
      when: "beforeChildren",
    },
  },
};

export const innerAnimate = {
  hidden: { opacity: 0, y: 100 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      ease: "easeIn",
      duration: 0.8,
    },
  },
};

export const listAnimate = {
  hidden: { opacity: 0, y: 100 },
  animate: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.08,
      duration: 0.8,
      type: "spring",
    },
  }),
};

export const menuVariant = {
  hidden: { y: -window.innerHeight },
  animate: { y: 0, transition: { duration: 1 } },
  exit: { opacity: 0, y: 30, transition: { duration: 10 } },
};

export const pageVariant = {
  hidden: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 2 } },
  exit: { opacity: 0, y: 30, transition: { duration: 10 } },
};
