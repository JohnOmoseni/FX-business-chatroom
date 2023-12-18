import { motion } from "framer-motion";
import { SpiralSpinner } from "react-spinners-kit";

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
  icon,
  disabled,
  onClick,
}) => {
  return (
    <motion.button
      type={type ?? "text"}
      disabled={disabled}
      className={`${
        disabled || icon ? "flex-row gap-2.5" : ""
      } ${className} px-5 py-2 rounded-sm shadow-md transition-sm active:scale-95 disabled:opacity-60`}
      variants={animate ? buttonAnimate : null}
      initial="hidden"
      whileInView="animate"
      viewport={{ once: true }}
      onClick={onClick}
    >
      {icon && <span className="">{icon}</span>}
      {disabled && !icon && (
        <span className="">
          <SpiralSpinner size={30} />
        </span>
      )}
      <span
        className={`${
          textGradient && "text-gradient-100"
        } font-semibold tracking-wide`}
      >
        {title}
      </span>
    </motion.button>
  );
};

export default Button;
