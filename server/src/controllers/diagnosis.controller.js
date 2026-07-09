import diagnosisData from "../data/diagnosisData.js";

export const diagnoseMotorcycle = async (req, res) => {
  try {
    const { symptom } = req.body;

    if (!symptom) {
      return res.status(400).json({
        message: "Symptom is required",
      });
    }

    const input = symptom.toLowerCase();

    const match = diagnosisData.find((item) =>
      input.includes(item.symptom)
    );

    if (!match) {
      return res.json({
        diagnosis:
          "Unable to determine the issue.",
        recommendation:
          "Please consult a qualified mechanic for a detailed inspection.",
        severity: "Unknown",
      });
    }

    res.json(match);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};