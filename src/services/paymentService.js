import api from "./api";

export async function createPayment(payload) {
  const { data } = await api.post("/pagamento/cadastro", payload);
  return data;
}

export async function getPayments() {
  const { data } = await api.get("/pagamento/view");
  return data;
}
