import { diagnoseWithGemini } from "../services/gemini.service.js";

export const diagnoseMotorcycle = async (req, res) => {
  try {
    const { symptom } = req.body;

    if (!symptom?.trim()) {
      return res.status(400).json({
        message: "Symptom is required",
      });
    }

    const diagnosis = await diagnoseWithGemini(symptom);

    res.json(diagnosis);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to generate AI diagnosis.",
    });
  }
};
