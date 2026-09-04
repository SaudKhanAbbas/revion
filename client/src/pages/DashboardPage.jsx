import DashboardLayout from "../layouts/DashboardLayout";
import SkeletonCard from "../components/ui/SkeletonCard";
import { useDashboardData } from "../hooks/useDashboardData";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStatsGrid from "../components/dashboard/DashboardStatsGrid";
import DashboardHealthCard from "../components/dashboard/DashboardHealthCard";
import DashboardExpenseChart from "../components/dashboard/DashboardExpenseChart";
import DashboardRecentActivity from "../components/dashboard/DashboardRecentActivity";
import DashboardQuickActions from "../components/dashboard/DashboardQuickActions";

/**
 * DashboardPage acts as the composition and orchestration layer.
 * It uses the custom hook `useDashboardData` for async state management
 * and delegates UI rendering to focused child components.
 */
export default function DashboardPage() {
  const { dashboardData, loading, error } = useDashboardData();

  if (loading) {
    return (
      <DashboardLayout>
        <div className="grid gap-6 lg:grid-cols-4">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </DashboardLayout>
    );
  }

  if (error || !dashboardData) {
    return (
      <DashboardLayout>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-center text-red-400">
          <p className="font-semibold">Unable to load dashboard data.</p>
          <p className="mt-2 text-sm text-zinc-400">{error || "Something went wrong."}</p>
        </div>
      </DashboardLayout>
    );
  }

  const { user, stats, expenseChartData, recentMaintenance, recentExpenses } =
    dashboardData;

  return (
    <DashboardLayout>
      {/* Welcome Banner */}
      <DashboardHeader user={user} />

      {/* Primary Metrics Grid */}
      <DashboardStatsGrid stats={stats} />

      {/* Analytics: Health Score & Expense Chart */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <DashboardHealthCard healthScore={stats.averageHealthScore} />
        <DashboardExpenseChart expenseChartData={expenseChartData} />
      </div>

      {/* Activity Feeds */}
      <DashboardRecentActivity
        recentMaintenance={recentMaintenance}
        recentExpenses={recentExpenses}
      />

      {/* Quick Navigation Actions */}
      <DashboardQuickActions />
    </DashboardLayout>
  );
}