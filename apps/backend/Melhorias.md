# 🚀 Plano de Melhorias Arquiteturais - API Vetric

Este documento detalha as recomendações para evoluir a arquitetura atual da API, focando em **performance**, **segurança de tipos (Type Safety)** e **manutenibilidade** utilizando o ecossistema Bun + Elysia.

---

## 🏗️ Análise da Estrutura Atual

### Pontos Fortes
- **Organização por Features:** A separação em `src/features/auth/login` é excelente para escalabilidade.
- **Validação com Zod:** Garante integridade dos dados na entrada das rotas.
- **Uso do Bun:** Escolha moderna e de alta performance.

### Oportunidades de Melhoria
1. **Camada de Dados:** Uso de SQL puro em strings dificulta a manutenção e não provê auxílio do TypeScript.
2. **Hashing de Senha:** `bcryptjs` é lento comparado às APIs nativas do Bun.
3. **Tratamento de Erros:** Uso de `throw new Error()` genéricos em vez de respostas HTTP semânticas.
4. **Acoplamento:** O Handler está com muitas responsabilidades (DB, Logística de Senha, JWT).

---

## 🛠️ Recomendações Técnicas

### 1. Camada de Dados com Drizzle ORM
Substituir o `bun:sqlite` puro pelo **Drizzle ORM**.
- **Por que?** Ele é o ORM mais rápido para Bun, oferecendo Type Safety total sem o overhead do Prisma.
- **Ação:** Instalar `drizzle-orm` e `drizzle-kit`.

### 2. APIs Nativas do Bun
O Bun possui implementações nativas em C++ para tarefas comuns que são ordens de magnitude mais rápidas que bibliotecas JS.
- **Hashing:** Trocar `bcryptjs` por `Bun.password`.
  ```typescript
  // Antigo (bcryptjs)
  const valid = await compare(password, hash);
  
  // Novo (Nativo do Bun - muito mais rápido)
  const valid = await Bun.password.verify(password, hash);
  ```

### 3. Ecossistema Elysia (Plugins)
Utilizar plugins oficiais para reduzir código boilerplate.
- **JWT:** Usar `@elysiajs/jwt` para injetar as funções de token no contexto.
- **Erros:** Usar o helper `error` do Elysia para retornar status codes corretos (401, 400, 500).

### 4. Padrão Service Layer
Mover a lógica de negócio do `handler.ts` para um `service.ts`. Isso permite que a lógica seja testada sem depender do protocolo HTTP.

---

## 📝 Exemplo de Refatoração (Sugestão)

### Handler Moderno (`src/features/auth/login/handler.ts`)
```typescript
import { error } from "elysia";
import { AuthService } from "../auth.service"; // Camada de serviço

export async function loginHandler({ body, jwt }: any) {
  const user = await AuthService.validateCredentials(body.email, body.password);
  
  if (!user) {
    return error(401, { 
      code: "INVALID_CREDENTIALS",
      message: "E-mail ou senha incorretos." 
    });
  }

  const token = await jwt.sign({ 
    sub: user.id,
    email: user.email 
  });

  return { access_token: token };
}
```

---

## ✅ Próximos Passos Sugeridos

1. [ ] **Setup Drizzle:** Configurar o schema do banco e gerar as primeiras migrações.
2. [ ] **Refatorar Auth:** Aplicar as APIs nativas do Bun para senhas.
3. [ ] **Middlewares de Segurança:** Adicionar `elysia-cors` e `elysia-helmet`.
4. [ ] **Variáveis de Ambiente:** Validar o `.env` usando `t3-env` ou `zod`.

---
*Documento gerado para auxiliar na evolução técnica do projeto Vetric.*
