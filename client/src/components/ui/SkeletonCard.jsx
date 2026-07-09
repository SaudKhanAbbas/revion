export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="h-6 w-40 rounded bg-zinc-800"></div>

      <div className="mt-4 h-4 w-24 rounded bg-zinc-800"></div>

      <div className="mt-8 h-10 w-20 rounded bg-zinc-800"></div>
    </div>
  );
}