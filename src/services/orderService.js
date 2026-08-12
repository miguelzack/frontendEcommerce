import api from "./api";

export async function createOrder(payload) {
  const previousOrders = await getOrders();
  const previousIds = new Set(previousOrders.map((order) => order.id));
  const { data } = await api.post("/pedido/cadastro", payload);
  if (data?.id) return data;

  // A API atualmente confirma o cadastro sem devolver o pedido no corpo.
  // A consulta abaixo recupera o registro real recém-criado para obter seu ID.
  const orders = await getOrders();
  const candidates = orders.filter((order) =>
    !previousIds.has(order.id) &&
    order.cliente_id === payload.cliente_id &&
    order.momento === payload.momento &&
    order.status === payload.status &&
    order.items?.length === payload.items.length,
  );
  return candidates.at(-1) || data;
}

export async function getOrders() {
  const { data } = await api.get("/pedido/view");
  return data;
}

export async function getOrderById(id) {
  const { data } = await api.get(`/pedido/view/${id}`);
  return data;
}

export async function deleteOrder(id) {
  await api.delete(`/pedido/delete/${id}`);
}
