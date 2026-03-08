# Vetric Monorepo

Este repositório é um monorepo organizado contendo aplicações e pacotes compartilhados.

## Estrutura de Pastas

A estrutura do projeto está organizada da seguinte forma:

### `apps/`
Contém as aplicações executáveis do projeto.
- `api/`: Backend API.
- `web/`: Frontend web application.
- `docs/`: Documentação do projeto.

### `packages/`
Contém bibliotecas e utilitários compartilhados entre as aplicações.
- `ui/`: Componentes de interface compartilhados.
- `config/`: Configurações compartilhadas (ESLint, TSConfig, etc.).
- `utils/`: Funções utilitárias comuns.

### `tools/`
Scripts e ferramentas de automação para o desenvolvimento e build do monorepo.

## Comandos Principais

- `npm install`: Instala as dependências de todos os pacotes.
- `npm run build`: Executa o build de todos os pacotes.
- `npm run test`: Executa os testes.
