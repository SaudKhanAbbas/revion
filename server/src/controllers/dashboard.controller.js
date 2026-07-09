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

    const averageHealthScore =
      totalMotorcycles === 0
        ? 0
        : Math.round(
            motorcycles.reduce(
              (sum, bike) => sum + bike.healthScore,
              0
            ) / totalMotorcycles
          );

    const latestMotorcycle =
      motorcycles.length > 0 ? motorcycles[0] : null;

    res.json({
      user: req.user,

      stats: {
        totalMotorcycles,
        totalMaintenance,
        totalExpenses,
        averageHealthScore,
      },

      latestMotorcycle,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};