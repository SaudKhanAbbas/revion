export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-2xl
        border border-zinc-800
        bg-zinc-900/70
        p-6
        shadow-lg
        backdrop-blur-sm
        ${className}
      `}
    >
      {children}
    </div>
  );
}