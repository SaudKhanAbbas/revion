import Motorcycle from "../models/Motorcycle.js";
import Maintenance from "../models/Maintenance.js";
import Expense from "../models/Expense.js";

export const getDashboardData = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    const maintenanceLogs = await Maintenance.find({
      owner: req.user._id,
    });

    const expenses = await Expense.find({
      owner: req.user._id,
    });

    const totalMotorcycles = motorcycles.length;
    const totalMaintenance = maintenanceLogs.length;

    const totalExpenses = expenses.reduce(
      (sum, expense) => sum + expense.amount,
      0
    );

    let totalHealthScore = 0;

    for (const bike of motorcycles) {
      const maintenanceCount = maintenanceLogs.filter(
        (log) =>
          log.motorcycle.toString() === bike._id.toString()
      ).length;

      let score = 100;

      const bikeAge =
        new Date().getFullYear() - bike.year;

      score -= bikeAge * 2;

      if (maintenanceCount === 0) {
        score -= 15;
      }

      score = Math.max(score, 0);

      totalHealthScore += score;
    }

    const averageHealthScore =
      totalMotorcycles === 0
        ? 0
        : Math.round(
            totalHealthScore / totalMotorcycles
          );

    const latestMotorcycle =
      motorcycles.length > 0 ? motorcycles[0] : null;

    const expenseBreakdown = {};

    expenses.forEach((expense) => {
      if (!expenseBreakdown[expense.category]) {
        expenseBreakdown[expense.category] = 0;
      }

      expenseBreakdown[expense.category] += expense.amount;
    });

    const expenseChartData = Object.entries(
      expenseBreakdown
    ).map(([name, value]) => ({
      name,
      value,
    }));

    res.json({
      user: req.user,

      stats: {
        totalMotorcycles,
        totalMaintenance,
        totalExpenses,
        averageHealthScore,
      },

      latestMotorcycle,

      expenseChartData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};