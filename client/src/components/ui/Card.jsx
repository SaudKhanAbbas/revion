export default function Card({
  children,
  className = "",
}) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-zinc-800/80
        bg-zinc-900/70
        p-6
        shadow-xl
        shadow-black/20
        backdrop-blur-md
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-zinc-700
        hover:shadow-2xl
        hover:shadow-black/40
        ${className}
      `}
    >
      {children}
    </div>
  );
}