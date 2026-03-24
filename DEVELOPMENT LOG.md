# Bitácora de Desarrollo - Sistema de Gestión de Tareas

## 1. Prompts Utilizados
- "Genera una estructura de capas para un proyecto Express con TypeScript separando api, services y persistence."
- "Crea un esquema de Zod para validar un objeto de Tarea con título obligatorio y descripción opcional."

## 2. Análisis Crítico de la IA
- **Sugerencia rechazada:** La IA sugirió poner la lógica de Prisma directamente en el controlador. 
- **Razón del rechazo:** El PDF pide explícitamente una capa de `persistence`. Moví las consultas a repositorios para cumplir con el Criterio 1.

## 3. Decisiones Técnicas Propias
- **Singleton:** Implementé la configuración como una clase Singleton para asegurar que las variables de entorno se validen solo una vez al iniciar la app.
- **Relación On-Delete:** En el esquema de Prisma, configuré `onDelete: Cascade` para que al borrar un usuario se limpien sus tareas automáticamente, mejorando la integridad de datos.

"Se implementó un archivo de configuración centralizado para el cliente de Prisma en src/config/database.ts. Esto garantiza que la aplicación mantenga una única instancia de conexión (siguiendo principios similares al Singleton sugerido en los requisitos), evitando el agotamiento de conexiones a la base de datos PostgreSQL/MongoDB y facilitando la inyección del cliente en los diferentes repositorios de la capa de persistencia."

"Al intentar inicializar Prisma, el sistema detectó que la carpeta ya existía. En lugar de forzar la instalación, procedí a configurar manualmente el archivo schema.prisma definiendo los modelos User y Task con una relación de uno a muchos, asegurando que cada tarea esté vinculada a un usuario único para cumplir con los requisitos de seguridad y privacidad solicitados."

"Se implementó la gestión de variables de entorno mediante un archivo .env y se creó un .env.example para facilitar la configuración del entorno de desarrollo por parte de terceros. Se prestó especial atención a la cadena de conexión de Prisma y a la definición de una JWT_SECRET robusta para asegurar la integridad de los tokens de sesión."

"Se implementó el desarrollo dirigido por pruebas (TDD) para la funcionalidad de registro. Se crearon mocks para las dependencias externas (Prisma, Bcrypt, JWT) con el fin de aislar la lógica del servicio en las pruebas unitarias. Esto garantiza que el flujo de registro (verificación, cifrado, creación y tokenización) sea robusto ante cambios futuros."

"Se corrigió un error de tipado (TS2339) en el middleware de validación. El conflicto surgía al intentar acceder a la propiedad .errors de una instancia de ZodError. Se resolvió migrando al uso de la propiedad .issues, que es el estándar nativo de Zod para el acceso a detalles de validación en entornos estrictos de TypeScript, garantizando así que el cliente reciba una retroalimentación clara sobre qué campos fallaron."


"Se implementaron pruebas de integración utilizando supertest para validar el flujo completo de la API. La decisión de incluir estos tests se tomó para garantizar que los middlewares de seguridad (Helmet, Rate Limit) y de validación (Zod) estén correctamente integrados con las rutas. Durante este proceso, se verificó que el validation.middleware.ts capturara correctamente los errores de esquema y respondiera con los códigos de estado HTTP adecuados (400 Bad Request), demostrando un control total sobre el ciclo de vida de la petición."

