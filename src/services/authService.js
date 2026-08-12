import api from "./api";

export async function login(credentials) {
  const { data } = await api.post("/usuario/login", credentials);
  return typeof data === "string" ? data : data.token || data.accessToken;
}

export async function register(userData) {
  const { data } = await api.post("/usuario/cadastro", userData);
  return data;
}
