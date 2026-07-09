import api from "./api";

export const diagnoseMotorcycle = async (symptom) => {
  const response = await api.post("/diagnosis", {
    symptom,
  });

  return response.data;
};