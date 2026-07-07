import Card from "../ui/Card";

export default function DashboardPreview() {
  return (
    <section className="mt-24 w-full">
      <Card className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">
              Dashboard Preview
            </h3>

            <p className="mt-1 text-zinc-400">
              Everything important, at a glance.
            </p>
          </div>

          <span className="rounded-full bg-emerald-500/20 px-4 py-2 text-sm font-medium text-emerald-400">
            Health Score: 94%
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <p className="text-sm text-zinc-400">
              Mileage
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              24,381 km
            </h4>
          </Card>

          <Card>
            <p className="text-sm text-zinc-400">
              Next Service
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              Oil Change
            </h4>
          </Card>

          <Card>
            <p className="text-sm text-zinc-400">
              Monthly Expense
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              ₹3,420
            </h4>
          </Card>

          <Card>
            <p className="text-sm text-zinc-400">
              AI Diagnosis
            </p>

            <h4 className="mt-3 text-2xl font-bold">
              Healthy
            </h4>
          </Card>
        </div>
      </Card>
    </section>
  );
}