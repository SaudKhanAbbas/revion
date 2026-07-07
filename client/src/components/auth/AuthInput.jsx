export default function AuthInput({
  label,
  type = "text",
  placeholder,
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm text-zinc-400">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="
          h-12
          rounded-xl
          border
          border-zinc-800
          bg-zinc-900
          px-4
          text-white
          outline-none
          transition
          focus:border-white
        "
      />
    </div>
  );
}