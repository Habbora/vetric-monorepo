# Contexto do Projeto: Vetric API

Este arquivo serve como referência para o contexto técnico, regras de negócio e convenções do projeto.
Ele deve ser utilizado para alinhar o desenvolvimento e manter a consistência nas interações.

## 1. Visão Geral
O **Vetric** é um sistema de gestão veterinária desenvolvido como um monorepo.
Este módulo (`apps/api`) é a API backend responsável pela lógica de negócios e persistência de dados.

## 2. Stack Tecnológica (Core)
- **Runtime:** [Bun](https://bun.sh) (v1.x+)
- **Framework Web:** [ElysiaJS](https://elysiajs.com)
- **Banco de Dados:** SQLite (nativo do Bun: `bun:sqlite`)
- **Linguagem:** TypeScript (ESNext)

## 3. Estrutura de Diretórios (Convenção)
```
apps/api/
├── src/
│   ├── db/          # Configuração do banco de dados e migrações
│   ├── migrations/  # Arquivos SQL de migração (ex: 001_init.sql)
│   ├── modules/     # Domínios da aplicação (users, pets, appointments)
│   ├── shared/      # Utilitários compartilhados
│   └── index.ts     # Ponto de entrada da aplicação
├── CONTEXT.md       # Este arquivo
└── package.json     # Dependências e scripts
```

## 4. Padrões de Código
- **Database:** Utilizar `bun:sqlite` diretamente para máxima performance.
- **Migrações:** Sistema próprio de migrações baseado em arquivos SQL (`src/db/migrate.ts`).
- **Estilo:** Priorizar funções puras e composição do Elysia.
- **Tipagem:** Strict mode ativado no TypeScript.

## 5. Regras de Negócio (Rascunho)
- **Usuários:** Veterinários, Recepcionistas e Administradores.
- **Pets:** Devem estar vinculados a um Tutor (Cliente).
- **Agendamentos:** Devem validar disponibilidade do veterinário.

## 6. Comandos Úteis
- `bun run dev`: Iniciar servidor de desenvolvimento.
- `bun run migrate`: Executar migrações de banco de dados.
- `bun test`: Rodar testes.

---
*Atualize este arquivo conforme o projeto evolui.*
