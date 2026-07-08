import Motorcycle from "../models/Motorcycle.js";

export const getDashboardData = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({
      owner: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const totalMotorcycles = motorcycles.length;

    const averageHealthScore =
      totalMotorcycles === 0
        ? 0
        : Math.round(
            motorcycles.reduce(
              (sum, motorcycle) =>
                sum + motorcycle.healthScore,
              0
            ) / totalMotorcycles
          );

    const latestMotorcycle =
      motorcycles.length > 0
        ? motorcycles[0]
        : null;

    res.json({
      user: req.user,

      stats: {
        totalMotorcycles,
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