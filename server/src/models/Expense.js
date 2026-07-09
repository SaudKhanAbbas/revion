import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
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

    category: {
      type: String,
      required: true,
      enum: [
        "Fuel",
        "Service",
        "Repair",
        "Insurance",
        "Accessories",
        "Parking",
        "Tolls",
        "Other",
      ],
    },

    amount: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    expenseDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Expense", expenseSchema);