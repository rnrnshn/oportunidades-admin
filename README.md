# Oportunidades Admin

> Admin UI / CMS institucional do ecossistema Oportunidades.

Esta aplicação é um SPA em Vite + React 19 para equipas internas e parceiros com papel `cms_partner` ou `admin`. Consome exclusivamente a API `oportunidades-api`.

---

## Stack

```txt
Vite
React 19
TanStack Router
TanStack Query
Tailwind v4
shadcn/ui
Zod
React Hook Form
TipTap (artigos)
TypeScript strict
```

---

## Estado actual

Implementado:

- login
- shell protegida
- dashboard base
- account page
- articles management
  - list
  - create
  - edit
  - publish / unpublish / archive
  - rich text editor com TipTap
  - upload de cover
- opportunities management
  - list
  - create
  - edit
  - verify / reject / deactivate
- universities management
  - list
  - create
  - edit
  - logo upload
- courses management
  - list
  - create
  - edit
- reports moderation
  - list
  - detail
  - moderation actions
- mentorship sessions
  - list
  - detail
  - status transitions

---

## Scripts

```bash
pnpm dev         # admin UI em http://localhost:3001
pnpm build       # build produção
pnpm preview     # preview do build
pnpm typecheck   # TypeScript
pnpm test        # vitest (quando houver testes)
```

---

## Configuração

Criar `.env.local` ou `.env` com:

```env
VITE_API_URL=http://localhost:8080
```

---

## Quick Start

1. arrancar a API em `http://localhost:8080`
2. arrancar o admin:

```bash
pnpm install
pnpm dev
```

App local:

```txt
http://localhost:3001
```

---

## Credenciais de desenvolvimento

Se aplicaste o seed no backend:

- admin
  - email: `admin@oportunidades.co.mz`
  - password: `password`
- cms/user demo
  - email: `user@oportunidades.co.mz`
  - password: `password`
- mentor demo
  - email: `mentor@oportunidades.co.mz`
  - password: `password`

---

## Estrutura

```txt
src/
├── app/
│   ├── providers.tsx
│   ├── query-client.ts
│   └── router.tsx
├── components/
│   ├── layout/
│   └── ui/
├── features/
│   ├── auth/
│   ├── articles/
│   ├── opportunities/
│   ├── universities/
│   ├── courses/
│   ├── reports/
│   ├── mentorship/
│   └── uploads/
├── lib/
│   ├── api-client.ts
│   ├── auth-store.ts
│   └── utils.ts
└── routes/
```

---

## Rotas actuais

- `/login`
- `/`
- `/articles`
- `/articles/new`
- `/articles/$id`
- `/opportunities`
- `/opportunities/new`
- `/opportunities/$id`
- `/universities`
- `/universities/new`
- `/universities/$id`
- `/courses`
- `/courses/new`
- `/courses/$id`
- `/reports`
- `/reports/$id`
- `/mentorship/sessions`
- `/mentorship/sessions/$id`
- `/account`

---

## API usada

### Auth / Account

- `POST /v1/auth/login`
- `POST /v1/auth/refresh`
- `GET /v1/account/me`
- `PATCH /v1/account/me`
- `POST /v1/account/password`
- `POST /v1/account/logout-all`
- `POST /v1/account/deactivate`

### CMS

- `GET /v1/cms/articles`
- `GET /v1/cms/articles/:id`
- `POST /v1/cms/articles`
- `PATCH /v1/cms/articles/:id`
- `GET /v1/cms/opportunities`
- `GET /v1/cms/opportunities/:id`
- `POST /v1/cms/opportunities`
- `PATCH /v1/cms/opportunities/:id`
- `GET /v1/cms/universities`
- `GET /v1/cms/universities/:id`
- `POST /v1/cms/universities`
- `PATCH /v1/cms/universities/:id`
- `GET /v1/cms/courses`
- `GET /v1/cms/courses/:id`
- `POST /v1/cms/courses`
- `PATCH /v1/cms/courses/:id`

### Admin

- `POST /v1/admin/articles/:id/publish`
- `POST /v1/admin/articles/:id/unpublish`
- `POST /v1/admin/articles/:id/archive`
- `POST /v1/admin/opportunities/:id/verify`
- `POST /v1/admin/opportunities/:id/reject`
- `POST /v1/admin/opportunities/:id/deactivate`
- `GET /v1/admin/reports`
- `GET /v1/admin/reports/:id`
- `PATCH /v1/admin/reports/:id`

### Mentorship

- `GET /v1/mentorship/sessions`
- `GET /v1/mentorship/sessions/:id`
- `PATCH /v1/mentorship/sessions/:id`

### Uploads

- `POST /v1/uploads/presign`
- `POST /v1/uploads/confirm`

---

## Upload/media flow

O admin usa o backend para gerar uploads assinados para Supabase Storage:

1. `POST /v1/uploads/presign`
2. upload directo do ficheiro
3. `POST /v1/uploads/confirm`
4. guardar `public_url` no formulário

Actualmente o `MediaField` já suporta:

- preview
- replace
- remove
- upload progress
- error state

---

## Design system

- usa `shadcn/ui`
- visualmente alinhado ao estilo do EmDash
- tipografia Geist
- sidebar escura, topo claro, superfícies neutras tipo CMS clássico

---

## Estado de qualidade

Actualmente:

- `pnpm typecheck` passa
- `pnpm build` passa

Nota:

- o bundle ainda está grande por causa do TipTap editor
- próximo passo natural é lazy-load para rotas pesadas como `/articles/$id`

---

## Próximos passos naturais

- toasts / mutation feedback
- loading / empty / error states mais consistentes
- lazy route loading
- refinamento visual adicional para aproximar ainda mais do EmDash
