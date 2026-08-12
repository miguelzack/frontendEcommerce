import api from "./api";

function atividadePendente() {
  void api;
  throw new Error("Atividade pendente: implemente esta requisição no userService.");
}

export async function getCurrentUser(token) {
  /*
    ATIVIDADE: consultar o usuário da sessão atual.
    Método HTTP: GET
    Endpoint: /usuario/me
    Autenticação: envie o token recebido como Bearer no header Authorization.
    Resposta: retorne os dados do usuário autenticado.
    Dica: o interceptor de api.js também demonstra como headers de autenticação funcionam.
  */
  void token;
  // TODO: implementar a consulta do usuário autenticado.
  return atividadePendente();
}

export async function getUserById(id) {
  /*
    ATIVIDADE: buscar um usuário pelo identificador.
    Método HTTP: GET
    Endpoint: /usuario/view/{id}
    Parâmetros: substitua {id} pelo UUID recebido.
    Resposta: retorne o usuário presente no body da resposta.
    Dica: esta rota protegida usa o Bearer Token configurado pela instância "api".
  */
  void id;
  // TODO: implementar a busca de usuário por ID.
  return atividadePendente();
}

export async function getUsers() {
  /*
    ATIVIDADE: listar os usuários cadastrados.
    Método HTTP: GET
    Endpoint: /usuario/view
    Parâmetros e body: não são necessários.
    Resposta: retorne a coleção recebida do backend.
    Dica: a autorização administrativa é enviada pelo interceptor.
  */
  // TODO: implementar a listagem de usuários.
  return atividadePendente();
}

export async function deleteUser(id) {
  /*
    ATIVIDADE: excluir um usuário pelo identificador.
    Método HTTP: DELETE
    Endpoint: /usuario/delete/{id}
    Parâmetros: substitua {id} pelo UUID do usuário selecionado.
    Resposta: aguarde a confirmação antes de atualizar a tabela.
    Dica: utilize a instância "api" para manter o Bearer Token centralizado.
  */
  void id;
  // TODO: implementar a exclusão do usuário.
  return atividadePendente();
}
