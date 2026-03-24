# Bitácora de Desarrollo - Sistema de Gestión de Tareas

## 1. Prompts Utilizados
"Genera una estructura de capas para un proyecto nodejs de Express con TypeScript separando api, services y persistence."

## 2. Análisis Crítico de la IA
# Sugerencia rechazada: La IA sugirió poner la lógica de Prisma directamente en el controlador. 
"Razón del rechazo: para que la capa de funcionamiento de prisma no choque con los demas procesos, es necesario que si folder sea loje de forma externa a la matriz src del proyecto."

## 3. Qué se aceptó y por qué — Explicar qué partes del código generado se incorporaron y qué las hace correctas o adecuadas para el proyecto.
# sugerencia aceptada: implementar una unica instancia de conexion con la base de datos para el cliente prisma
"Se implementó un archivo de configuración centralizado para el cliente de Prisma en src/config/database.ts. Esto garantiza que la aplicación mantenga una única instancia de conexión , evitando el agotamiento de conexiones a la base de datos PostgreSQL y facilitando la inyección del cliente en los diferentes repositorios de la capa de persistencia."

"Al intentar inicializar Prisma, el sistema detectó que la carpeta ya existía. En lugar de forzar la instalación, procedí a configurar manualmente el archivo schema.prisma definiendo los modelos User y Task con una relación de uno a muchos, asegurando que cada tarea esté vinculada a un usuario único para cumplir con los requisitos de seguridad y privacidad solicitados."

## 4. Decisiones Técnicas Propias
- Singleton: Implementé la configuración como una clase Singleton para asegurar que las variables de entorno se validen solo una vez al iniciar la app.
- Relación On-Delete: En el esquema de Prisma, configuré `onDelete: Cascade` para que al borrar un usuario se limpien sus tareas automáticamente, mejorando la integridad de datos.
- Se implementó la gestión de variables de entorno mediante un archivo .env y se creó un .env.example para facilitar la configuración del entorno de desarrollo por parte de terceros. Se prestó especial atención a la cadena de conexión de Prisma y a la definición de una JWT_SECRET robusta para asegurar la integridad de los tokens de sesión."

## 5. retos y soluciones
" durante el desarrollo de la api, surgieron problemas de typado, algunas llamadas de archivos mal ejecutadas, servicios que no fueron incluidos en un principio, y algunos mas. Para la resolucion de todas estas problematicas que no me perimitian ejecutar correctamente mi codigo, recurri a la documentacion de typescript, de swagger, de prisma, de jest,etc. y con la ayuda de las herramientas IA siguiendo los consejos de ejecucion que me brindaba la web, entendiendo en que habia fallado y cual era la ruta correcta, pude resolver las dificultades.




"Se implementaron pruebas de integración utilizando supertest para validar el flujo completo de la API. La decisión de incluir estos tests se tomó para garantizar que los middlewares de seguridad (Helmet, Rate Limit) y de validación (Zod) estén correctamente integrados con las rutas. Durante este proceso, se verificó que el validation.middleware.ts capturara correctamente los errores de esquema y respondiera con los códigos de estado HTTP adecuados (400 Bad Request), demostrando un control total sobre el ciclo de vida de la petición."

