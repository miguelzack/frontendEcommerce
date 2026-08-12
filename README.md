# Nexo E-commerce — Atividade de integração com API

Versão educacional de um frontend de e-commerce construído com React e Axios. A
interface, as rotas, os formulários e os estados visuais já estão prontos. O desafio é
implementar a comunicação entre o frontend e a API nos arquivos de service.

> Esta branch é propositalmente incompleta. As funções marcadas com `TODO` lançam um
> erro controlado até que a requisição correspondente seja implementada.

## Objetivo da atividade

Ao concluir o projeto, o estudante deverá ser capaz de:

- consumir uma API REST com Axios;
- diferenciar operações GET, POST, PUT e DELETE;
- trabalhar com path parameters e query parameters;
- enviar dados em JSON e `multipart/form-data`;
- interpretar a resposta e os códigos de status HTTP;
- utilizar autenticação com Bearer Token;
- separar componentes React, regras de interface e acesso à API;
- tratar carregamento, sucesso e erro em operações assíncronas.

O exercício não envolve reconstruir telas. Páginas, componentes, Styled Components,
rotas, formulários, tabelas, modais, cards e o painel administrativo já fazem parte da
aplicação.

## Tecnologias

- React 19
- Vite 8
- JavaScript
- Axios
- React Router DOM
- Styled Components
- Context API
- Lucide React
- Oxlint

Não utilize Fetch API, bibliotecas HTTP adicionais, mocks ou dados fixos para substituir
o backend.

## Preparação do ambiente

Requisitos:

- Node.js compatível com o Vite 8;
- npm;
- acesso à API configurada no projeto.

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Comandos disponíveis:

```bash
npm run dev      # inicia o servidor de desenvolvimento
npm run lint     # verifica problemas no código
npm run build    # gera a versão de produção
npm run preview  # visualiza localmente o build
```

## API utilizada

URL base:

```text
https://spring-back-third-semester-senai.onrender.com
```

A instância central está em `src/services/api.js`. Ela já contém:

- `baseURL`;
- timeout;
- header padrão para JSON;
- interceptor que adiciona o Bearer Token;
- tratamento global para sessão expirada.

Não crie outra instância Axios. Todos os services devem importar e utilizar a instância
`api` existente.

## Arquitetura da integração

O projeto segue este fluxo:

```text
Página ou componente
        ↓
função do service
        ↓
instância Axios (api.js)
        ↓
API REST
        ↓
resposta atualiza o estado React
```

As páginas já chamam funções como `getProducts`, `createOrder` e `deleteUser`. O trabalho
do estudante está concentrado em `src/services/`. Ao implementar corretamente um
service, as telas que dependem dele passam a receber os dados reais.

## Estrutura relevante

```text
src/
├── components/        componentes visuais e proteção de rotas
├── contexts/          autenticação, carrinho e notificações
├── pages/             loja, autenticação, perfil e painel ADMIN
├── routes/            configuração das rotas
├── services/
│   ├── api.js         instância Axios pronta
│   ├── authService.js
│   ├── categoryService.js
│   ├── orderService.js
│   ├── paymentService.js
│   ├── productService.js
│   └── userService.js
└── styles/            estilos globais
```

## Como realizar cada exercício

Dentro de cada função incompleta existe um bloco `ATIVIDADE` contendo:

- objetivo da operação;
- método HTTP;
- endpoint;
- parâmetros necessários;
- formato do body, quando aplicável;
- resultado que deve ser retornado;
- uma dica curta;
- marcador `TODO`.

Para cada TODO:

1. leia onde a função é utilizada nas páginas;
2. identifique método, endpoint, parâmetros e body;
3. faça a chamada assíncrona com a instância `api`;
4. obtenha o conteúdo retornado pelo Axios quando necessário;
5. retorne o valor no formato esperado pela página;
6. teste os estados de sucesso e erro;
7. execute lint e build antes de avançar.

Os dados enviados pelo backend normalmente ficam dentro da propriedade `data` da
resposta Axios. Algumas operações, como DELETE, podem responder sem body. Observe o
contrato de cada endpoint e o comportamento esperado no componente que chama o service.

## Catálogo de exercícios

### Autenticação

Arquivo: `src/services/authService.js`

| Exercício | Método | Endpoint | Dados principais |
| --- | --- | --- | --- |
| Entrar na conta | POST | `/usuario/login` | e-mail e senha em JSON |
| Cadastrar usuário | POST | `/usuario/cadastro` | nome, e-mail, telefone e senha em JSON |

O login deve retornar o token no formato esperado pelo `AuthContext`. Depois disso, o
contexto armazena a sessão e consulta o usuário autenticado.

### Produtos

Arquivo: `src/services/productService.js`

| Exercício | Método | Endpoint | Dados principais |
| --- | --- | --- | --- |
| Listar produtos | GET | `/produto/view` | query `categoriaId` opcional |
| Buscar produto | GET | `/produto/view/{id}` | UUID no caminho |
| Cadastrar produto | POST | `/produto/cadastro` | `multipart/form-data` |
| Atualizar produto | PUT | `/produto/{id}` | UUID no caminho e body JSON |
| Excluir produto | DELETE | `/produto/delete/{id}` | UUID no caminho |

No cadastro, o formulário prepara um `FormData` com:

- `nome`;
- `descricao`;
- `preco`;
- `imgUrl`;
- um ou mais `categoriaIds`.

Não transforme esse payload em JSON. A imagem exige envio multipart.

### Categorias

Arquivo: `src/services/categoryService.js`

| Exercício | Método | Endpoint | Dados principais |
| --- | --- | --- | --- |
| Listar categorias | GET | `/categoria/view` | sem body |
| Buscar categoria | GET | `/categoria/view/{id}` | UUID no caminho |

### Usuários

Arquivo: `src/services/userService.js`

| Exercício | Método | Endpoint | Dados principais |
| --- | --- | --- | --- |
| Consultar sessão | GET | `/usuario/me` | Bearer Token |
| Buscar usuário | GET | `/usuario/view/{id}` | UUID no caminho |
| Listar usuários | GET | `/usuario/view` | rota protegida |
| Excluir usuário | DELETE | `/usuario/delete/{id}` | UUID e perfil ADMIN |

### Pedidos

Arquivo: `src/services/orderService.js`

| Exercício | Método | Endpoint | Dados principais |
| --- | --- | --- | --- |
| Criar pedido | POST | `/pedido/cadastro` | cliente, data, status e itens em JSON |
| Listar pedidos | GET | `/pedido/view` | Bearer Token |
| Buscar pedido | GET | `/pedido/view/{id}` | UUID no caminho |
| Excluir pedido | DELETE | `/pedido/delete/{id}` | UUID e autorização adequada |

Cada item enviado na criação do pedido possui produto, quantidade e preço. Consulte
`Cart.jsx` para entender como o payload já é montado antes de chegar ao service.

### Pagamentos

Arquivo: `src/services/paymentService.js`

| Exercício | Método | Endpoint | Dados principais |
| --- | --- | --- | --- |
| Registrar pagamento | POST | `/pagamento/cadastro` | pedido e momento em JSON |
| Listar pagamentos | GET | `/pagamento/view` | Bearer Token |

## Sequência recomendada

1. listar produtos;
2. buscar produto por ID;
3. listar e buscar categorias;
4. cadastrar produto com imagem;
5. atualizar produto;
6. excluir produto;
7. cadastrar usuário e realizar login;
8. consultar `/usuario/me`;
9. listar, buscar e excluir usuários;
10. criar, listar, buscar e excluir pedidos;
11. registrar e listar pagamentos.

Essa ordem começa com rotas públicas simples, avança para bodies JSON e multipart e só
depois aborda autenticação e operações administrativas.

## Autenticação e autorização

O projeto utiliza JWT armazenado na chave `nexo_token` do `localStorage`. O interceptor
de `api.js` adiciona o token no header `Authorization` das requisições posteriores.

O `AuthContext` controla:

- usuário autenticado;
- recuperação da sessão;
- login e cadastro;
- logout;
- limpeza de sessão expirada.

`PrivateRoute` protege páginas de clientes autenticados. `AdminRoute` também verifica se
o usuário possui a role `ADMIN`. Um usuário comum não deve acessar `/admin` ou suas
subrotas.

## Rotas disponíveis

Área pública e do cliente:

- `/` — página inicial;
- `/produtos` — catálogo;
- `/produto/:id` — detalhes;
- `/categorias` — categorias;
- `/carrinho` — carrinho;
- `/login` e `/cadastro` — autenticação;
- `/perfil`, `/pedidos` e `/pagamento/:pedidoId` — rotas protegidas.

Painel administrativo:

- `/admin` — dashboard;
- `/admin/produtos` — produtos;
- `/admin/produtos/novo` — cadastro;
- `/admin/produtos/:id/editar` — edição;
- `/admin/usuarios` e `/admin/usuarios/:id` — usuários;
- `/admin/pedidos` e `/admin/pedidos/:id` — pedidos;
- `/admin/pagamentos` — pagamentos.

## Códigos HTTP importantes

- `200 OK` — consulta ou atualização concluída;
- `201 Created` — recurso criado;
- `204 No Content` — operação concluída sem body;
- `400 Bad Request` — payload ou parâmetro inválido;
- `401 Unauthorized` — token ausente, inválido ou expirado;
- `403 Forbidden` — usuário autenticado sem permissão;
- `404 Not Found` — recurso não localizado;
- `409 Conflict` — operação incompatível com o estado do recurso;
- `500 Internal Server Error` — falha inesperada no backend.

Não trate todos os erros como se fossem iguais. Durante os testes, examine status,
headers e body da resposta na aba Network do navegador.

## Roteiro de testes

Após implementar um módulo, valide pelo menos:

- carregamento inicial e atualização da interface;
- resposta com lista vazia;
- identificador válido e inválido;
- sucesso e erro em formulários;
- prevenção de clique duplo durante loading;
- atualização da tabela somente após confirmação da API;
- persistência da sessão após F5;
- logout seguido de login com outra conta;
- bloqueio de rotas ADMIN para usuários comuns;
- mensagens retornadas para 401, 403, 404 e 500.

## Critérios de conclusão

O trabalho estará completo quando:

- todos os TODOs de `src/services/` estiverem implementados;
- nenhuma chamada usar Fetch API;
- não houver uma segunda instância Axios;
- não existirem mocks ou arrays fixos substituindo a API;
- os formulários enviarem o formato correto;
- o token atual for utilizado nas rotas protegidas;
- as telas exibirem dados reais do backend;
- `npm run lint` terminar sem erros;
- `npm run build` concluir com sucesso.

## Dicas de depuração

- confirme o método e a URL na aba Network;
- diferencie path parameter de query parameter;
- confira o body enviado e o `Content-Type`;
- verifique se o header `Authorization` contém o token atual;
- inspecione `error.response`, status e dados retornados pelo Axios;
- teste o service pela tela que já o utiliza;
- evite esconder erros com recarregamentos forçados da página.

## Regras da atividade

- use apenas Axios para comunicação HTTP;
- implemente as requisições dentro dos services;
- não altere o design para resolver a atividade;
- não crie mocks, fixtures ou APIs alternativas;
- não copie soluções completas para comentários ou arquivos auxiliares;
- preserve a separação entre página, service e API;
- faça commits pequenos e descritivos conforme concluir os módulos.
