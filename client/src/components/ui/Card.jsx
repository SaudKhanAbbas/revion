import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 22,
      }}
      className={`
        rounded-3xl
        border
        border-zinc-800/70
        bg-zinc-900/60
        p-6
        shadow-[0_8px_30px_rgba(0,0,0,0.25)]
        backdrop-blur-xl
        transition-all
        duration-300
        hover:border-sky-400/30
        hover:shadow-[0_12px_40px_rgba(56,189,248,0.08)]
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}