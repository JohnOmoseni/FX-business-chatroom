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

export const ButtonVariant = ({ icon, title, onClick, className }) => (
  <button
    className={`${className} py-2.5 px-6 rounded-full flex-row gap-2 shadow-md border border-solid border-br-light hover:drop-shadow-sm hover:scale-x-105 active:scale-100 active:translate-y-1 bg-gradient-200 opacity-80 cursor-pointer`}
    onClick={onClick}
  >
    {icon}
    <span>{title}</span>
  </button>
);

const Button = ({
  title,
  type,
  className,
  animate,
  textGradient,
  icon,
  disabled,
  loadingText,
  onClick,
}) => {
  return (
    <motion.button
      type={type ?? "text"}
      disabled={disabled}
      className={`${
        disabled || icon ? "flex-row gap-2.5" : ""
      } ${className} px-5 py-2.5 rounded-md shadow-md transition-sm cursor-pointer active:scale-95 disabled:opacity-60`}
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
        } font-semibold tracking-wide capitalize`}
      >
        {disabled && loadingText ? loadingText : title}
      </span>
    </motion.button>
  );
};

export default Button;
