import api from "./api";

export const getServiceGuides = async (categoryId = null) => {
  const url = categoryId
    ? `/service-guides/category/${categoryId}`
    : "/service-guides";
  const response = await api.get(url);
  return response.data;
};

export const getServiceCategories = async () => {
  const response = await api.get("/service-guides/categories");
  return response.data;
};
