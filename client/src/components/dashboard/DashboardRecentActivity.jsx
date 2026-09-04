import Card from "../ui/Card";

export default function DashboardRecentActivity({
  recentMaintenance = [],
  recentExpenses = [],
}) {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      {/* Recent Maintenance Card */}
      <Card>
        <h2 className="mb-6 text-xl font-bold">Recent Maintenance</h2>

        {recentMaintenance.length === 0 ? (
          <p className="text-zinc-500">No maintenance records yet.</p>
        ) : (
          <div className="space-y-5">
            {recentMaintenance.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 p-4"
              >
                <div>
                  <p className="font-semibold">{item.serviceType}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {item.motorcycle?.manufacturer} {item.motorcycle?.model}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Recent Expenses Card */}
      <Card>
        <h2 className="mb-6 text-xl font-bold">Recent Expenses</h2>

        {recentExpenses.length === 0 ? (
          <p className="text-zinc-500">No expenses recorded.</p>
        ) : (
          <div className="space-y-5">
            {recentExpenses.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between rounded-2xl border border-zinc-800 p-4"
              >
                <div>
                  <p className="font-semibold">{item.category}</p>
                  <p className="mt-1 text-sm text-zinc-500">
                    {item.motorcycle?.manufacturer} {item.motorcycle?.model}
                  </p>
                </div>

                <span className="font-bold text-emerald-400">
                  ₹{item.amount}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
