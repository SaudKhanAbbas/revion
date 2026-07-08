import api from "./api";

export const getMotorcycles = async () => {
  const response = await api.get("/motorcycles");
  return response.data;
};

export const createMotorcycle = async (motorcycleData) => {
  const response = await api.post(
    "/motorcycles",
    motorcycleData
  );

  return response.data;
};

export const updateMotorcycle = async (
  id,
  motorcycleData
) => {
  const response = await api.put(
    `/motorcycles/${id}`,
    motorcycleData
  );

  return response.data;
};