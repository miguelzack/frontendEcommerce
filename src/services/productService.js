import api from "./api";

function atividadePendente() {
  void api;
  throw new Error("Atividade pendente: implemente esta requisição no productService.");
}

export async function getProducts(categoryId) {
  /*
    ATIVIDADE: listar os produtos, opcionalmente filtrados por categoria.
    Método HTTP: GET
    Endpoint: /produto/view
    Parâmetros: quando categoryId existir, envie-o como query parameter "categoriaId".
    Resposta: retorne a coleção presente no body da resposta.
    Dica: use a instância "api" e observe onde o Axios guarda os dados recebidos.
  */
  void categoryId;
  // TODO: implementar a listagem de produtos.
  return atividadePendente();
}

export async function getProductById(id) {
  /*
    ATIVIDADE: buscar os detalhes de um produto.
    Método HTTP: GET
    Endpoint: /produto/view/{id}
    Parâmetros: substitua {id} pelo UUID recebido pela função.
    Resposta: retorne o produto enviado no body da resposta.
    Dica: monte o path parameter sem enviar o objeto inteiro.
  */
  void id;
  // TODO: implementar a busca de produto por ID.
  return atividadePendente();
}

export async function createProduct(formData) {
  /*
    ATIVIDADE: cadastrar um produto com imagem e categorias.
    Método HTTP: POST
    Endpoint: /produto/cadastro
    Body: multipart/form-data com nome, descricao, preco, imgUrl e categoriaIds.
    O formulário da página já prepara um FormData; envie-o usando a instância "api".
    Resposta: retorne os dados ou a confirmação recebida do backend.
    Dica: esta operação não envia JSON comum; confira o Content-Type apropriado.
  */
  void formData;
  // TODO: implementar o cadastro multipart do produto.
  return atividadePendente();
}

export async function updateProduct(id, product) {
  /*
    ATIVIDADE: atualizar um produto existente.
    Método HTTP: PUT
    Endpoint: /produto/{id}
    Parâmetros: substitua {id} pelo UUID recebido.
    Body: envie o objeto product como JSON.
    Resposta: retorne o conteúdo recebido após a atualização.
    Dica: api.put() recebe o endpoint e o body em argumentos separados.
  */
  void id;
  void product;
  // TODO: implementar a atualização do produto.
  return atividadePendente();
}

export async function deleteProduct(id) {
  /*
    ATIVIDADE: excluir um produto pelo identificador.
    Método HTTP: DELETE
    Endpoint: /produto/delete/{id}
    Parâmetros: substitua {id} pelo UUID do produto selecionado no modal.
    Resposta: retorne a resposta para a página atualizar a listagem após o sucesso.
    Dica: aguarde a confirmação da API antes de considerar o item excluído.
  */
  void id;
  // TODO: implementar a exclusão do produto.
  return atividadePendente();
}
