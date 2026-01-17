# 🧩 Products API + Frontend Example

<img width="1365" height="679" alt="image" src="https://github.com/user-attachments/assets/5c2fbd29-080d-42d8-b26d-fa0081e9b1b2" />


Este repositório demonstra uma **arquitetura fullstack simples, tipada e testável**, usando:

* **Backend**: Node.js + Express + TypeScript + Knex (SQLite em memória)
* **Frontend**: Vue 3 + Composition API + TypeScript + Axios
* **Contrato de API** fortemente tipado (Success / Error)
* **Padrão de Use Cases** no backend

O foco principal **não é framework**, e sim:

* clareza de responsabilidades
* previsibilidade de respostas
* DX (Developer Experience)
* testabilidade (Vitest / Jest-friendly)

---

## 📦 Contrato de API

Toda comunicação entre frontend e backend segue **um único contrato**.

### ApiResponse (Discriminated Union)

```ts
export interface ApiSuccess<T> {
  success: true
  status: number
  message: string
  body: T
}

export interface ApiErrorBody {
  code: string
  details?: unknown
}

export interface ApiError<E = ApiErrorBody> {
  success: false
  status: number
  message: string
  error: E
}

export type ApiResponse<T, E = ApiErrorBody> =
  | ApiSuccess<T>
  | ApiError<E>
```

### ✅ Benefícios

* `success` é o **discriminant**
* `body` **só existe** em respostas de sucesso
* `error` **só existe** em respostas de erro
* Zero `null`, zero `as`, zero ambiguidades

---

## 🏭 Response Factory (Backend)

Centraliza a criação de respostas HTTP.

```ts
export class ApiResponseFactory {
  static success<T>(
    body: T,
    message = 'OK',
    status = 200
  ): ApiSuccess<T> {
    return {
      success: true,
      status,
      message,
      body
    }
  }

  static error<E = ApiErrorBody>(
    error: E,
    message = 'Erro',
    status = 400
  ): ApiError<E> {
    return {
      success: false,
      status,
      message,
      error
    }
  }
}
```

👉 Controllers **não montam JSON manualmente**.

---

## 🧠 Arquitetura do Backend

```
src
 ├── app
 │   ├── config
 │   │   └── schema.ts        # Criação de tabelas (SQLite :memory:)
 │   ├── errors
 │   │   └── AppError.ts
 │   ├── middlewares
 │   │   └── error-middleware.ts
 │   ├── repositories
 │   │   └── product-repository.ts
 │   ├── use-cases
 │   │   └── product
 │   │       ├── create-product
 │   │       ├── delete-product
 │   │       ├── find-product-by-id
 │   │       ├── list-product
 │   │       └── seed-product
 │   └── routes
 │       └── product.routes.ts
 └── server.ts
```

### 🎯 Princípios

* **Use Case ≠ Controller**
* Controller só traduz HTTP → domínio
* Use Case não conhece Express
* Repository é abstração de dados

---

## 🧪 Banco de Dados (SQLite em memória)

```ts
import knex from 'knex'

export const db = knex({
  client: 'sqlite3',
  connection: { filename: ':memory:' },
  useNullAsDefault: true
})
```

Schema criado no bootstrap:

```ts
await db.schema.createTable('products', table => {
  table.increments('id').primary()
  table.string('name').notNullable()
  table.decimal('price', 10, 2).notNullable()
  table.boolean('is_active').defaultTo(true)
  table.timestamp('created_at').defaultTo(db.fn.now())
})
```

👉 Ideal para testes e exemplos.

---

## 🌐 Rotas da API

```http
POST   /products
GET    /products
GET    /products/:id
DELETE /products/:id/delete
POST   /products/seed
GET    /products/error/500
```

Todas retornam `ApiResponse<T>`.

---

## 🎨 Frontend (Vue 3)

### Service Layer

```ts
export class ProductService {
  insert(payload: CreateProductDTO): Promise<ApiResponse<number>>
  getAll(): Promise<ApiResponse<ProductResponse[]>>
  getById(id: string): Promise<ApiResponse<ProductResponse>>
}
```

👉 Front **não conhece Axios diretamente**, só serviços.

---

## 🔔 Toast + DX

Exemplo real de uso:

```ts
const { success, body, message } = await services.product.getAll()

toast.show({
  message,
  variant: success ? 'success' : 'warning'
})

if (success) products.value = body
```

Simples, legível e previsível.

---

## 🧪 Testabilidade (Vitest)

### Frontend

* Services mockáveis
* Toast desacoplado
* Sem lógica HTTP no componente

```ts
vi.spyOn(productService, 'getAll').mockResolvedValue({
  success: true,
  status: 200,
  message: 'ok',
  body: []
})
```

### Backend

* Use cases testáveis sem Express
* Repositórios mockáveis

---

## 🧠 SOLID Check

| Princípio | Status                                 |
| --------- | -------------------------------------- |
| SRP       | ✅ Cada camada tem uma responsabilidade |
| OCP       | ✅ Fácil estender responses / erros     |
| LSP       | ✅ ApiResponse é substituível           |
| ISP       | ✅ Success ≠ Error                      |
| DIP       | ✅ Use cases dependem de abstrações     |

---

## 🚫 Overengineering?

❌ Não.

Motivos:

* Tipagem resolve problemas reais
* Contrato reduz bugs
* Código continua simples
* Escala sem refatoração traumática

---

## 🚀 Conclusão

Este projeto mostra **como organizar um CRUD moderno** com:

* tipagem forte
* respostas previsíveis
* arquitetura limpa
* frontend desacoplado

Sem framework mágico, sem hype — **engenharia honesta**.

---

Se quiser evoluir:

* adicionar auth
* paginação
* cache
* OpenAPI / Swagger

Tudo encaixa naturalmente nesse modelo.
