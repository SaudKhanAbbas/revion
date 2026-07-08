import Button from "../ui/Button";

export default function MotorcycleCard({
  motorcycle,
  onEdit,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition hover:border-zinc-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            {motorcycle.manufacturer}
          </h2>

          <p className="mt-1 text-zinc-400">
            {motorcycle.model}
          </p>
        </div>

        <div className="rounded-xl bg-zinc-800 px-3 py-2 text-sm text-zinc-300">
          {motorcycle.year}
        </div>
      </div>

      <div className="mt-6 space-y-2 text-zinc-300">
        <p>
          <span className="font-semibold">Engine:</span>{" "}
          {motorcycle.engineCC} cc
        </p>

        <p>
          <span className="font-semibold">Mileage:</span>{" "}
          {motorcycle.mileage.toLocaleString()} km
        </p>

        <p>
          <span className="font-semibold">Health Score:</span>{" "}
          {motorcycle.healthScore}/100
        </p>
      </div>

      <div className="mt-6">
        <Button onClick={() => onEdit(motorcycle)}>
          Edit
        </Button>
      </div>
    </div>
  );
}