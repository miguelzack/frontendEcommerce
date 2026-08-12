import api from "./api";

export async function getCurrentUser() {
  const { data } = await api.get("/usuario/me");
  return data;
}

export async function getUserById(id) {
  const { data } = await api.get(`/usuario/view/${id}`);
  return data;
}

export async function getUsers() {
  const { data } = await api.get("/usuario/view");
  return data;
}

export async function deleteUser(id) {
  await api.delete(`/usuario/delete/${id}`);
}
