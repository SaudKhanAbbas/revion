import Motorcycle from "../models/Motorcycle.js";

// Create Motorcycle
export const createMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.create({
      owner: req.user._id,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      year: req.body.year,
      engineCC: req.body.engineCC,
      mileage: req.body.mileage,
      image: req.body.image,
    });

    res.status(201).json({
      message: "Motorcycle created successfully",
      motorcycle,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Motorcycles
export const getMotorcycles = async (req, res) => {
  try {
    const motorcycles = await Motorcycle.find({
      owner: req.user._id,
    });

    res.json(motorcycles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Motorcycle
export const getMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!motorcycle) {
      return res.status(404).json({
        message: "Motorcycle not found",
      });
    }

    res.json(motorcycle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Motorcycle
export const updateMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!motorcycle) {
      return res.status(404).json({
        message: "Motorcycle not found",
      });
    }

    res.json({
      message: "Motorcycle updated successfully",
      motorcycle,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Motorcycle
export const deleteMotorcycle = async (req, res) => {
  try {
    const motorcycle = await Motorcycle.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!motorcycle) {
      return res.status(404).json({
        message: "Motorcycle not found",
      });
    }

    res.json({
      message: "Motorcycle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};