import {
  Bike,
  Calendar,
  Gauge,
  HeartPulse,
  Pencil,
  Trash2,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

export default function MotorcycleCard({
  motorcycle,
  onEdit,
  onDelete,
}) {
  const healthColor =
    motorcycle.healthScore >= 80
      ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20"
      : motorcycle.healthScore >= 60
      ? "bg-yellow-500/15 text-yellow-400 border-yellow-500/20"
      : "bg-red-500/15 text-red-400 border-red-500/20";

  return (
    <Card className="group overflow-hidden p-0">

      <div className="relative flex h-44 items-center justify-center border-b border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-950 to-black">

        <Bike
          size={90}
          className="text-zinc-700 transition duration-300 group-hover:scale-110 group-hover:text-sky-400"
        />

        <div
          className={`absolute right-5 top-5 rounded-full border px-4 py-2 text-sm font-semibold ${healthColor}`}
        >
          {motorcycle.healthScore}/100
        </div>

      </div>

      <div className="p-6">

        <h2 className="text-2xl font-bold">
          {motorcycle.manufacturer}
        </h2>

        <p className="mt-1 text-zinc-400">
          {motorcycle.model}
        </p>

        <div className="mt-6 grid grid-cols-3 gap-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-center">

            <Calendar
              size={18}
              className="mx-auto text-sky-400"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Year
            </p>

            <p className="mt-1 font-semibold">
              {motorcycle.year}
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-center">

            <Gauge
              size={18}
              className="mx-auto text-orange-400"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Mileage
            </p>

            <p className="mt-1 font-semibold">
              {motorcycle.mileage.toLocaleString()}
            </p>

          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-3 text-center">

            <HeartPulse
              size={18}
              className="mx-auto text-emerald-400"
            />

            <p className="mt-2 text-xs text-zinc-500">
              Engine
            </p>

            <p className="mt-1 font-semibold">
              {motorcycle.engineCC}cc
            </p>

          </div>

        </div>

        <div className="mt-8 flex gap-3">

          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onEdit(motorcycle)}
          >
            <Pencil
              size={16}
              className="mr-2"
            />
            Edit
          </Button>

          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => onDelete(motorcycle)}
          >
            <Trash2
              size={16}
              className="mr-2"
            />
            Delete
          </Button>

        </div>

      </div>

    </Card>
  );
}