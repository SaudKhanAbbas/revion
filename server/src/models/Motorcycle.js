import mongoose from "mongoose";

const motorcycleSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    engineCC: {
      type: Number,
      required: true,
    },

    mileage: {
      type: Number,
      default: 0,
    },

    healthScore: {
      type: Number,
      default: 100,
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Motorcycle", motorcycleSchema);