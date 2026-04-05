# 🚀 Task Manager API

API REST para gestión personal de tareas organizadas por boards.

---

## 📌 Características

- autenticación JWT
- gestión de tareas
- organización por boards
- filtros y búsqueda
- paginación
- arquitectura limpia
- documentación Swagger
- Docker

---

## 🧠 Concepto

Aplicación individual tipo gestor de tareas/notas del móvil.

- cada usuario gestiona sus tareas
- no hay colaboración
- boards para organización
- vista general con todas las tareas

---

## 📄 Documentación

- [Requisitos](docs/requirements.md)
- [Reglas de negocio](docs/business-rules.md)
- [Arquitectura](docs/architecture.md)
- [API](docs/api-spec.md)

---

## 🛠️ Stack

### Backend
- Java 21
- Spring Boot
- Spring Security
- JWT
- PostgreSQL
- JPA / Hibernate
- Swagger / OpenAPI

### Frontend
- React
- TypeScript
- Vite
- Material UI
- Axios
- React Router DOM

### Testing
- JUnit 5
- Mockito
- Spring Boot Test
- MockMvc
- H2 Database

---

## ▶️ Ejecución

```bash
mvn spring-boot:run
mvn test
npm install
npm run dev

