import api from "./api";

function atividadePendente() {
  void api;
  throw new Error("Atividade pendente: implemente esta requisição no paymentService.");
}

export async function createPayment(payload) {
  /*
    ATIVIDADE: registrar o pagamento de um pedido.
    Método HTTP: POST
    Endpoint: /pagamento/cadastro
    Body JSON: envie pedido_id e momento conforme o payload recebido.
    Resposta: retorne a confirmação ou os dados do pagamento criado.
    Dica: use a instância "api" para que a autenticação permaneça centralizada.
  */
  void payload;
  // TODO: implementar o cadastro do pagamento.
  return atividadePendente();
}

export async function getPayments() {
  /*
    ATIVIDADE: listar os pagamentos cadastrados.
    Método HTTP: GET
    Endpoint: /pagamento/view
    Parâmetros e body: não são necessários.
    Resposta: retorne a coleção presente no body da resposta.
    Dica: confira a propriedade da resposta Axios que contém os dados da API.
  */
  // TODO: implementar a listagem de pagamentos.
  return atividadePendente();
}
