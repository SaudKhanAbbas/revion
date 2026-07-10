import {
  Calendar,
  Gauge,
  Wrench,
  Pencil,
  Trash2,
} from "lucide-react";

import Card from "../ui/Card";
import Button from "../ui/Button";

export default function MaintenanceCard({
  log,
  onEdit,
  onDelete,
}) {
  return (
    <Card className="group overflow-hidden p-0">

      <div className="border-b border-zinc-800 bg-gradient-to-r from-zinc-900 via-zinc-950 to-black p-6">

        <div className="flex items-start justify-between">

          <div>

            <div className="flex items-center gap-3">

              <div className="rounded-2xl bg-sky-400/10 p-3">
                <Wrench
                  size={22}
                  className="text-sky-400"
                />
              </div>

              <div>

                <h2 className="text-2xl font-bold">
                  {log.serviceType}
                </h2>

                <p className="mt-1 text-zinc-400">
                  {log.motorcycle.manufacturer}{" "}
                  {log.motorcycle.model}
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-sm text-zinc-400">

            <Calendar
              size={15}
              className="mr-2 inline"
            />

            {new Date(
              log.serviceDate
            ).toLocaleDateString()}

          </div>

        </div>

      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

          <Gauge
            size={18}
            className="text-orange-400"
          />

          <p className="mt-3 text-xs uppercase tracking-wider text-zinc-500">
            Mileage
          </p>

          <h3 className="mt-1 text-xl font-bold">
            {log.mileage.toLocaleString()} km
          </h3>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Cost
          </p>

          <h3 className="mt-4 text-xl font-bold text-emerald-400">
            ₹{log.cost}
          </h3>

        </div>

      </div>

      {log.description && (

        <div className="px-6">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4">

            <p className="text-xs uppercase tracking-wider text-zinc-500">
              Description
            </p>

            <p className="mt-3 text-zinc-300">
              {log.description}
            </p>

          </div>

        </div>

      )}

      <div className="flex gap-3 p-6">

        <Button
          variant="outline"
          className="flex-1"
          onClick={() => onEdit(log)}
        >
          <Pencil
            size={16}
            className="mr-2"
          />

          Edit

        </Button>

        <Button
          variant="danger"
          className="flex-1"
          onClick={() => onDelete(log)}
        >
          <Trash2
            size={16}
            className="mr-2"
          />

          Delete

        </Button>

      </div>

    </Card>
  );
}