import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    error,
    className = "",
    ...props
  },
  ref
) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium tracking-wide text-zinc-300">
          {label}
        </label>
      )}

      <input
        ref={ref}
        {...props}
        className={`
          h-12
          w-full
          rounded-2xl
          border
          border-zinc-800
          bg-zinc-900/70
          px-4
          text-white
          placeholder:text-zinc-500
          outline-none
          transition-all
          duration-300
          focus:border-sky-400
          focus:bg-zinc-900
          focus:ring-4
          focus:ring-sky-400/10
          ${className}
        `}
      />

      {error && (
        <p className="text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;