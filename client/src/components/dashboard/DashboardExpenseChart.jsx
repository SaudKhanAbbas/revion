import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Card from "../ui/Card";

const COLORS = [
  "#22c55e",
  "#38bdf8",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
  "#84cc16",
  "#ec4899",
];

export default function DashboardExpenseChart({ expenseChartData }) {
  return (
    <Card>
      <h2 className="text-xl font-bold">Expense Breakdown</h2>

      {expenseChartData.length === 0 ? (
        <p className="mt-8 text-zinc-500">No expense data yet.</p>
      ) : (
        <div className="mt-6 h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={expenseChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >
                {expenseChartData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}
