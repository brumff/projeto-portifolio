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

---

# Testes Automatizados da API

Os testes automatizados têm como objetivo garantir a qualidade e estabilidade da API, verificando o comportamento esperado para as principais funcionalidades, como cadastro de usuários, login, gerenciamento de livros, status de leitura e avaliações.

---

## **Stack Utilizada**

- **Linguagem**: JavaScript (Node.js)
- **Framework de Testes**: Mocha
- **Bibliotecas**:
  - **Supertest**: Para testes de integração.
  - **Chai**: Para asserções.
  - **Dotenv**: Para gerenciar variáveis de ambiente.

---

## **Estrutura do Diretório**

```plaintext
src/tests/api/
├── avaliacao.test.js   # Testes relacionados às avaliações
├── cadastro.test.js    # Testes relacionados ao cadastro de usuários
├── leitura.test.js     # Testes relacionados ao status de leitura
├── livros.test.js      # Testes relacionados ao gerenciamento de livros
├── login.test.js       # Testes relacionados ao login de usuários
```

---

## **Formato do Arquivo `.env`**

O arquivo `.env` deve conter as seguintes variáveis:
```plaintext
BASE_URL=http://localhost:3000
PORT=3000
```

---

## **Comandos para Execução dos Testes**

- **Instalar dependências**:
  ```bash
  npm install
  ```
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

## **Links para Documentação das Dependências**

- [Mocha](https://mochajs.org/)
- [Supertest](https://github.com/visionmedia/supertest)
- [Chai](https://www.chaijs.com/)
- [Dotenv](https://github.com/motdotla/dotenv)

---

# Testes de Performance da API

Os testes de performance têm como objetivo avaliar o desempenho e a estabilidade da API sob diferentes cargas de usuários simultâneos. O teste simula um aumento gradual de usuários até 1.000 simultâneos, verificando:
- **Tempo de resposta**: 95% das requisições devem ser respondidas em até 1 segundo.
- **Taxa de falhas**: Menos de 1% das requisições devem falhar.
- **Estabilidade**: O sistema deve se manter estável durante o pico de carga.

---

## **Stack Utilizada**

- **Ferramenta de Teste de Performance**: K6
- **Linguagem**: JavaScript (para scripts de teste)

---

## **Estrutura do Diretório**

```plaintext
src/tests/performance/
└── acesso-simultaneos.js   # Teste de performance para acessos simultâneos
```

---

## **Comandos para Execução dos Testes**

- **Instalar o K6**:
  Certifique-se de que o K6 está instalado na sua máquina. Se não estiver, instale-o seguindo as instruções da [documentação oficial](https://k6.io/docs/getting-started/installation/).

- **Executar o teste de performance**:
  ```bash
  k6 run src/tests/performance/acesso-simultaneos.js
  ```

---

## **Links para Documentação das Dependências**

- [K6](https://k6.io/docs/)

---


