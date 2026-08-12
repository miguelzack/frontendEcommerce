import api from "./api";

function atividadePendente() {
  void api;
  throw new Error("Atividade pendente: implemente esta requisição no categoryService.");
}

export async function getCategories() {
  /*
    ATIVIDADE: listar todas as categorias.
    Método HTTP: GET
    Endpoint: /categoria/view
    Parâmetros e body: não são necessários.
    Resposta: retorne a coleção recebida do backend.
    Dica: utilize api.get() e acesse o body disponibilizado pelo Axios.
  */
  // TODO: implementar a listagem de categorias.
  return atividadePendente();
}

export async function getCategoryById(id) {
  /*
    ATIVIDADE: buscar uma categoria pelo identificador.
    Método HTTP: GET
    Endpoint: /categoria/view/{id}
    Parâmetros: substitua {id} pelo UUID recebido.
    Resposta: retorne a categoria presente no body da resposta.
    Dica: o UUID faz parte da URL, não da query string.
  */
  void id;
  // TODO: implementar a busca de categoria por ID.
  return atividadePendente();
}
