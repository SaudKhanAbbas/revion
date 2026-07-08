import Maintenance from "../models/Maintenance.js";

// Create Maintenance Log
export const createMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.create({
      owner: req.user._id,
      motorcycle: req.body.motorcycle,
      serviceType: req.body.serviceType,
      description: req.body.description,
      cost: req.body.cost,
      mileage: req.body.mileage,
      serviceDate: req.body.serviceDate,
    });

    res.status(201).json({
      message: "Maintenance log created successfully",
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Maintenance Logs
export const getMaintenanceLogs = async (req, res) => {
  try {
    const maintenanceLogs = await Maintenance.find({
      owner: req.user._id,
    })
      .populate("motorcycle", "manufacturer model")
      .sort({ serviceDate: -1 });

    res.json(maintenanceLogs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Maintenance Log
export const updateMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!maintenance) {
      return res.status(404).json({
        message: "Maintenance log not found",
      });
    }

    res.json({
      message: "Maintenance updated successfully",
      maintenance,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Maintenance Log
export const deleteMaintenance = async (req, res) => {
  try {
    const maintenance = await Maintenance.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!maintenance) {
      return res.status(404).json({
        message: "Maintenance log not found",
      });
    }

    res.json({
      message: "Maintenance deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};