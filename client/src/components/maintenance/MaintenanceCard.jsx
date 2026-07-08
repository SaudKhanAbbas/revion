import Button from "../ui/Button";

export default function MaintenanceCard({
  log,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">
            {log.serviceType}
          </h3>

          <p className="mt-1 text-zinc-400">
            {log.motorcycle.manufacturer} {log.motorcycle.model}
          </p>
        </div>

        <span className="rounded-lg bg-zinc-800 px-3 py-1 text-sm text-zinc-300">
          {new Date(log.serviceDate).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-5 space-y-2 text-zinc-300">
        <p>
          <strong>Mileage:</strong>{" "}
          {log.mileage.toLocaleString()} km
        </p>

        <p>
          <strong>Cost:</strong> ₹{log.cost}
        </p>

        {log.description && (
          <p>
            <strong>Description:</strong>{" "}
            {log.description}
          </p>
        )}
      </div>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => onEdit(log)}>
          Edit
        </Button>

        <Button
          variant="danger"
          onClick={() => onDelete(log)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}