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

## Padrões de Projeto (Design Patterns)

### 1. Vertical Slice Architecture (Arquitetura por Domínio)

O projeto é organizado por **features** (funcionalidades) em vez de camadas técnicas (MVC tradicional).

- **Por que?** Facilita a manutenção e escalabilidade. Quando uma feature de "Pagamentos" é adicionada, todos os arquivos relacionados estão em uma única pasta, reduzindo o acoplamento com outras partes do sistema.

### 2. Service Layer (Camada de Serviço)

Toda a lógica de negócio pesada reside em arquivos `*.service.ts`.

- **Por que?** Desacopla a lógica do framework web (Elysia). Se precisarmos mudar de Elysia para outro framework, ou usar a mesma lógica em uma CLI/Cron job, o serviço permanece intocado.

### 3. Data Mapper (Drizzle ORM)

Diferente do Active Record (onde a lógica de salvamento está na própria entidade), o Drizzle separa o esquema (`schema.ts`) das operações de banco.

- **Por que?** Proporciona tipagem estática rigorosa ("TypeScript-first") e performance superior, já que não há a sobrecarga de objetos complexos e "mágicos" ao redor dos dados brutos.

### 4. Schema-Based Validation (Fail-Fast)

Utilizamos o padrão de validação via esquema (`*.schema.ts`) integrado diretamente nas rotas.

- **Por que?** Segurança e integridade. O sistema recusa dados malformados na "porta de entrada", garantindo que a lógica de negócio receba apenas dados válidos e tipados.

### 5. Middleware / Plugin Pattern

O Elysia utiliza o padrão de plugins para estender funcionalidades (`.use()`).

- **Por que?** Modularização. Funcionalidades como autenticação JWT, CORS e logging são injetadas de forma declarativa, mantendo o `server.ts` limpo e focado na orquestração.

### 6. Utility / Helper (Static Methods)

Classes como `PasswordUtils` encapsulam lógicas utilitárias globais.

- **Por que?** Centralização de lógicas sensíveis (segurança) e facilidade de uso em qualquer parte do sistema sem necessidade de gerenciamento de estado ou instâncias complexas.

## Fluxo de Dados

1. O **Elysia** recebe a requisição.
2. O **Schema** valida o corpo/parâmetros (fail-fast).
3. A **Route** (index.ts) delega a lógica para o **Service**.
4. O **Service** interage com o **Drizzle** e retorna dados tipados.
5. A **Route** retorna a resposta serializada automaticamente.
