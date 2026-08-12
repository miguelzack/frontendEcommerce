import api from "./api";

function atividadePendente() {
  void api;
  throw new Error("Atividade pendente: implemente esta requisição no orderService.");
}

export async function createOrder(payload) {
  /*
    ATIVIDADE: cadastrar um novo pedido.
    Método HTTP: POST
    Endpoint: /pedido/cadastro
    Body JSON: cliente_id, momento, status e a lista items.
    Cada item contém produto_id, quantidade e preco.
    Resposta: retorne o pedido ou a confirmação fornecida pela API.
    Dica: examine como Cart.jsx monta o payload antes de implementar o api.post().
  */
  void payload;
  // TODO: implementar o cadastro do pedido.
  return atividadePendente();
}

export async function getOrders() {
  /*
    ATIVIDADE: listar os pedidos disponíveis para o usuário autenticado.
    Método HTTP: GET
    Endpoint: /pedido/view
    Parâmetros e body: não são necessários.
    Resposta: retorne a coleção recebida no body.
    Dica: o Bearer Token é incluído pelo interceptor de api.js.
  */
  // TODO: implementar a listagem de pedidos.
  return atividadePendente();
}

export async function getOrderById(id) {
  /*
    ATIVIDADE: buscar os detalhes de um pedido.
    Método HTTP: GET
    Endpoint: /pedido/view/{id}
    Parâmetros: substitua {id} pelo UUID recebido.
    Resposta: retorne o pedido presente no body da resposta.
    Dica: use um path parameter e mantenha a chamada assíncrona.
  */
  void id;
  // TODO: implementar a busca de pedido por ID.
  return atividadePendente();
}

export async function deleteOrder(id) {
  /*
    ATIVIDADE: excluir um pedido pelo identificador.
    Método HTTP: DELETE
    Endpoint: /pedido/delete/{id}
    Parâmetros: substitua {id} pelo UUID do pedido selecionado.
    Resposta: aguarde a confirmação antes de atualizar a interface.
    Dica: erros HTTP devem continuar chegando ao try/catch da página.
  */
  void id;
  // TODO: implementar a exclusão do pedido.
  return atividadePendente();
}
