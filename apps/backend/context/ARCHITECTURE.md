# Arquitetura do Sistema (Vetric API)

## Tecnologias Principais
- **Runtime:** [Bun](https://bun.sh) (Escolha excelente para performance e DX nativa).
- **Framework:** [ElysiaJS](https://elysiajs.com) (Especializado em performance e tipagem end-to-end).
- **ORM:** [Drizzle ORM](https://orm.drizzle.team) (Abordagem "TypeScript-first" leve e eficiente).
- **Banco de Dados:** SQLite (Armazenado em `sqlite.db`).

## Estrutura de Diretórios
- `src/boot/`: Configurações de inicialização e migrações do banco.
- `src/db/`: Esquemas do banco e entidades globais.
- `src/features/`: **Núcleo do sistema.** Organizado por domínio (Auth, Users).
  - `index.ts`: Define as rotas do domínio.
  - `*.service.ts`: Lógica de negócio e acesso ao banco.
  - `*.schema.ts`: Validação de entrada via Zod/Elysia.
- `src/plugins/`: Extensões do Elysia (Auth/JWT, Middlewares).

## Fluxo de Dados
1. O **Elysia** recebe a requisição.
2. O **Schema** valida o corpo/parâmetros (fail-fast).
3. A **Route** (index.ts) delega a lógica para o **Service**.
4. O **Service** interage com o **Drizzle** e retorna dados tipados.
5. A **Route** retorna a resposta serializada automaticamente.
