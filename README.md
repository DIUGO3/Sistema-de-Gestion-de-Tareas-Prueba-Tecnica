# Sistema de Gestion de Tareas

Backend REST desarrollado con Express, TypeScript, Prisma y PostgreSQL para autenticacion de usuarios y gestion de tareas.

## Stack

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT
- Zod
- Jest
- Swagger

## Funcionalidades

- Registro de usuarios
- Login con JWT
- Rutas protegidas con middleware de autenticacion
- CRUD de tareas por usuario autenticado
- Validacion de entrada con Zod
- Documentacion interactiva con Swagger
- Pruebas unitarias e integracion para auth
- Pruebas unitarias para task service

## Estructura

```text
src/
  api/
    routes/
    auth.middleware.ts
    error.middleware.ts
    validation.middleware.ts
  config/
    configManager.ts
    database.ts
    env.ts
    swagger.ts
  controllers/
  persistence/
  schemas/
  services/
  test/
  utils/
app.ts
server.ts
prisma/
```

## Requisitos

- Node.js 18 o superior
- PostgreSQL
- npm

## Variables de entorno

Usa el archivo `.env.example` como base.

```env
PORT=8080
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
JWT_SECRET="your_jwt_secret_here"
FRONTEND_URL="http://localhost:5173"
```

En desarrollo local el proyecto usa un `.env` similar a:

```env
PORT=3000
NODE_ENV=development
DATABASE_URL="postgresql://postgres:12345@localhost:5432/taskdb_test?schema=public"
JWT_SECRET="una_clave_super_secreta_y_larga_123!"
JWT_EXPIRES_IN="30d"
FRONTEND_URL="http://localhost:5173"
```

## Instalacion

```bash
npm install
```

## Prisma

Si es la primera vez que levantas el proyecto:

```bash
npx prisma generate
npx prisma migrate dev
```

Si Prisma queda desfasado respecto al `schema.prisma`, vuelve a ejecutar:

```bash
npx prisma generate
```

## Ejecucion

```bash
npm run dev
```

Servidor:

```text
http://localhost:3000
```

Swagger:

```text
http://localhost:3000/api-docs
```

## Scripts

```bash
npm run dev
npm test
npm run test:watch
npm run test:coverage
```

## Flujo para probar la API

1. Inicia el servidor con `npm run dev`.
2. Abre `http://localhost:3000/api-docs`.
3. Ejecuta `POST /api/auth/register`.
4. Ejecuta `POST /api/auth/login`.
5. Copia el token JWT.
6. Pulsa `Authorize` en Swagger y pega `Bearer TU_TOKEN`.
7. Prueba `POST /api/tasks`.

Ejemplo para crear una tarea:

```json
{
  "title": "Preparar entrega",
  "description": "Terminar la prueba tecnica",
  "dueDate": "2026-03-30T18:00:00.000Z",
  "status": "pending"
}
```

## Endpoints principales

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### Tasks

- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/:id`
- `DELETE /api/tasks/:id`

## Pruebas

Archivos principales de prueba:

- `src/test/auth.service.test.ts`
- `src/test/auth.integration.test.ts`
- `src/test/task.service.test.ts`

Para ejecutar toda la suite:

```bash
npm test
```

## Decisiones tecnicas

- Se uso JWT para proteger las rutas de tareas.
- Se agrego una capa `persistence` para encapsular el acceso a Prisma en tareas.
- Se implemento validacion con Zod para mejorar el feedback de errores.
- Se dejo Swagger como interfaz de prueba rapida de la API.

## Pendientes o mejoras futuras

- Agregar pruebas de integracion para tareas.
- Unificar por completo la configuracion entre `env.ts` y `configManager.ts`.
- Completar documentacion Swagger con mas respuestas y ejemplos.
- Agregar pipeline de lint y build para entrega automatizada.
