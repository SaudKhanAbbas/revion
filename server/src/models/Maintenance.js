import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema(
  {
    motorcycle: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Motorcycle",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    cost: {
      type: Number,
      default: 0,
    },

    mileage: {
      type: Number,
      required: true,
    },

    serviceDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Maintenance",
  maintenanceSchema
);