export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50 active:scale-95";

  const variants = {
    primary:
      "bg-white text-black shadow-lg shadow-white/10 hover:-translate-y-0.5 hover:bg-zinc-200 hover:shadow-white/20",

    secondary:
      "border border-zinc-700 bg-zinc-900 text-white hover:-translate-y-0.5 hover:border-zinc-500 hover:bg-zinc-800",

    danger:
      "bg-red-600 text-white shadow-lg shadow-red-500/10 hover:-translate-y-0.5 hover:bg-red-500 hover:shadow-red-500/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}