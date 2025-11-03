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

# Testes Automatizados da API

Este repositório contém testes automatizados para a API, localizados na pasta `src/tests/api`. Este documento fornece um passo a passo para configurar e executar os testes.

---

## **Pré-requisitos**

Antes de rodar os testes, certifique-se de que você possui os seguintes itens instalados:
1. **Node.js** (versão 16 ou superior)
2. **npm** (gerenciador de pacotes do Node.js)
3. **Dependências do projeto** (instaladas via `npm install`)

---

## **Passo a Passo**

### 1. **Clone o repositório**
Se ainda não tiver o repositório clonado, execute:
```bash
git clone <URL_DO_REPOSITORIO>
cd projeto-portifolio
```

### 2. **Instale as dependências**
Certifique-se de que todas as dependências necessárias estão instaladas:
```bash
npm install
```

### 3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto (se ainda não existir) e configure as variáveis necessárias, como a URL base da API. Exemplo:
```
BASE_URL=http://localhost:3000
```

### 4. **Inicie o servidor da API**
Certifique-se de que o servidor da API está rodando antes de executar os testes. Use o comando:
```bash
npm start
```

### 5. **Execute os testes**
Para rodar os testes, use o comando abaixo:

- **Executar todos os testes**:
  ```bash
  npx mocha
  ```

- **Executar um arquivo de teste específico**:
  Substitua `<arquivo>` pelo nome do arquivo de teste que deseja executar. Por exemplo:
  ```bash
  npx mocha src/tests/api/cadastro.test.js
  ```

---

## **Estrutura dos Testes**

Os testes estão organizados da seguinte forma:

- **`cadastro.test.js`**: Testes relacionados ao cadastro de usuários.
- **`login.test.js`**: Testes relacionados ao login de usuários.
- **`livros.test.js`**: Testes relacionados ao cadastro e gerenciamento de livros.
- **`leitura.test.js`**: Testes relacionados ao status de leitura.
- **`avaliacao.test.js`**: Testes relacionados à avaliação e comentários de livros.

---

## **Dicas**

- Use a flag `--reporter` para alterar o formato do relatório dos testes. Por exemplo:
  ```bash
  npx mocha --reporter spec
  ```
- Para rodar apenas um teste específico dentro de um arquivo, utilize `.only` no bloco `it` ou `describe`.

---

Com este guia, você poderá configurar e executar os testes da API de forma eficiente.
