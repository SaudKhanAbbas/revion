import api from "./api";

export const getMotorcycles = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/motorcycles", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};