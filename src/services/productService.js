import api from "./api";

export async function getProducts(categoryId) {
  const { data } = await api.get("/produto/view", { params: categoryId ? { categoriaId: categoryId } : {} });
  return data;
}

export async function getProductById(id) {
  const { data } = await api.get(`/produto/view/${id}`);
  return data;
}

export async function createProduct(formData) {
  const { data } = await api.post("/produto/cadastro", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
}

export async function updateProduct(id, product) {
  const { data } = await api.put(`/produto/${id}`, product);
  return data;
}

export async function deleteProduct(id) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) {
    throw new Error("Identificador de produto inválido.");
  }
  return api.delete(`/produto/delete/${id}`);
}
