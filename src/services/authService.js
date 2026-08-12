import api from "./api";

function atividadePendente() {
  void api;
  throw new Error("Atividade pendente: implemente esta requisição no authService.");
}

export async function login(credentials) {
  /*
    ATIVIDADE: autenticar um usuário e obter seu token de acesso.
    Método HTTP: POST
    Endpoint: /usuario/login
    Body JSON: envie email e senha recebidos em credentials.
    Resposta: retorne somente o token, considerando que a API pode enviá-lo como texto
    ou dentro de uma propriedade do objeto de resposta.
    Dica: o AuthContext armazenará o valor retornado e consultará /usuario/me.
  */
  void credentials;
  // TODO: implementar o login com Axios e retornar o token.
  return atividadePendente();
}

export async function register(userData) {
  /*
    ATIVIDADE: cadastrar uma nova conta de usuário.
    Método HTTP: POST
    Endpoint: /usuario/cadastro
    Body JSON: nome, email, telefone e senha presentes em userData.
    Resposta: retorne os dados ou a confirmação enviada pelo backend.
    Dica: mantenha o tratamento de erros no formulário que chama este service.
  */
  void userData;
  // TODO: implementar o cadastro de usuário.
  return atividadePendente();
}
