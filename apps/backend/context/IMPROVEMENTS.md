# Melhorias Arquiteturais Sugeridas

## 1. Tratamento de Erros Centralizado
- **Atual:** Erros 401/404 são tratados manualmente nas rotas (usando `set.status`).
- **Sugestão:** Usar o `error()` helper do Elysia ou criar uma classe `AppError` para disparar erros padronizados em qualquer nível (especialmente nos Services).

## 2. Injeção de Dependência / Contexto
- **Sugestão:** Passar o banco de dados (Drizzle `db`) via contexto no Elysia (`.derive()` ou `.state()`). Isso facilitaria testes unitários no futuro, permitindo mockar o DB.

## 3. Estruturação de Services
- **Atual:** `AuthService` é importado diretamente.
- **Sugestão:** Considerar o uso de classes singleton ou funções puras que recebam dependências (como o DB).

## 4. Segurança do JWT
- **Sugestão:** Implementar a expiração (`exp`) no payload do JWT e rotas de **Refresh Token**.
- **Sugestão:** Criar um plugin de proteção de rotas (`authGuard`) para não precisar injetar e checar o JWT manualmente em todas as rotas privadas.

## 5. Validação de Variáveis de Ambiente
- **Sugestão:** Usar uma biblioteca como `zod` ou `t3-env` para validar o arquivo `.env` ao iniciar o servidor, evitando erros "undefined" em runtime (especialmente segredos de JWT e caminhos de banco).

## 6. Documentação (Swagger)
- **Sugestão:** Habilitar o `@elysiajs/swagger`. Como você já usa schemas no Elysia, a documentação gerada será extremamente precisa e interativa (facilitando testes no frontend).
