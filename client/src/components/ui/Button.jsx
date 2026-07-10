import { motion } from "framer-motion";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "filled",
  disabled = false,
  className = "",
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    filled:
      "bg-sky-400 text-black hover:bg-sky-300",

    outline:
      "border border-zinc-700 bg-zinc-900 text-white hover:border-sky-400 hover:bg-zinc-800",

    ghost:
      "bg-transparent text-zinc-300 hover:bg-zinc-900 hover:text-white",

    destructive:
      "bg-red-500 text-white hover:bg-red-400",
  };

  return (
    <motion.button
      whileHover={{
        y: -2,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.97,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 20,
      }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.button>
  );
}