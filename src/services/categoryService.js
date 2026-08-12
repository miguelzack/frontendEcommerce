import api from "./api";

export async function getCategories() {
  const { data } = await api.get("/categoria/view");
  return data;
}

export async function getCategoryById(id) {
  const { data } = await api.get(`/categoria/view/${id}`);
  return data;
}
