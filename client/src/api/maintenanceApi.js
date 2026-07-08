import api from "./api";

export const getMaintenanceLogs = async () => {
  const response = await api.get("/maintenance");
  return response.data;
};

export const createMaintenance = async (maintenanceData) => {
  const response = await api.post(
    "/maintenance",
    maintenanceData
  );

  return response.data;
};

export const updateMaintenance = async (
  id,
  maintenanceData
) => {
  const response = await api.put(
    `/maintenance/${id}`,
    maintenanceData
  );

  return response.data;
};

export const deleteMaintenance = async (id) => {
  const response = await api.delete(
    `/maintenance/${id}`
  );

  return response.data;
};