import { motion } from "framer-motion";

const buttonAnimate = {
  hidden: { opacity: 0, x: -100 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, type: "spring", mass: 0.3 },
  },
};

const Button = ({
  title,
  type,
  className,
  animate,
  textGradient,
  isIcon,
  disabled,
}) => {
  return (
    <motion.button
      type={type ?? "text"}
      disabled={disabled}
      className={`${
        isIcon ? "flex-row gap-2.5" : ""
      } ${className} px-5 py-2 rounded-sm shadow-sm disabled:opacity-70`}
      variants={animate ? buttonAnimate : null}
      initial="hidden"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {isIcon && (
        <span className="">
          <Icon size="20" />
        </span>
      )}
      <span
        className={`${
          textGradient && "text-gradient-100"
        } font-semibold tracking-tight`}
      >
        {title}
      </span>
    </motion.button>
  );
};

export default Button;
