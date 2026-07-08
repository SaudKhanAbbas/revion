import DashboardLayout from "../layouts/DashboardLayout";

export default function MaintenancePage() {
  return (
    <DashboardLayout>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Maintenance
          </h1>

          <p className="mt-2 text-zinc-400">
            Track every service your motorcycles receive.
          </p>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-zinc-700 p-12 text-center">
        <h2 className="text-2xl font-semibold text-white">
          No maintenance logs yet
        </h2>

        <p className="mt-3 text-zinc-400">
          Your maintenance history will appear here.
        </p>
      </div>
    </DashboardLayout>
  );
}