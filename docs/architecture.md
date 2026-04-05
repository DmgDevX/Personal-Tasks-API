# 🏗️ Arquitectura del Sistema

## 📌 Enfoque

Arquitectura basada en capas siguiendo buenas prácticas de Spring Boot.

---

## 🧱 Capas

### Controller
- expone endpoints REST
- recibe requests
- delega en la capa de servicio
- devuelve responses

### Service
- implementa la lógica de negocio
- valida reglas funcionales
- comprueba la pertenencia de recursos al usuario autenticado

### Repository
- acceso a datos
- consultas JPA
- operaciones CRUD

---

## 📦 Estructura del proyecto

```text
com.dmgdev.taskmanager
│
├── auth
├── board
├── security
├── task
└── user