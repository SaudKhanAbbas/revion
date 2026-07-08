import api from "./api";

export const getMotorcycles = async () => {
  const response = await api.get("/motorcycles");

  return response.data;
};