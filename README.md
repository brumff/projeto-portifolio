# API de Livros

API Rest em JavaScript para registrar livros, status da leitura, avaliação e comentários.

## Funcionalidades
- Cadastro de usuário
- Cadastro de livro (autenticado)
- Atualização do status de leitura (autenticado)
- Avaliação e comentário de leitura (autenticado)
- Listagem de livros, status e avaliações

## Autenticação
A autenticação é feita via JWT. Para cadastrar livro, atualizar status de leitura e avaliar, é necessário estar logado e enviar o token no header `Authorization`.

## Documentação Swagger
A documentação da API está disponível em `/api-docs` após iniciar o servidor.

## Como executar
1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor:
   ```bash
   npm start
   ```
3. Acesse a documentação em [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Estrutura do Projeto
- `src/routes`: Rotas da API
- `src/controllers`: Lógica dos endpoints
- `src/service`: Regras de negócio
- `src/model`: Modelos e banco de dados em memória
- `src/middleware`: Middleware de autenticação JWT
- `recursos/swagger.yaml`: Documentação Swagger

## Observações
- O banco de dados é em memória, os dados são perdidos ao reiniciar o servidor.
