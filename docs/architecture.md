# 🏗️ Arquitectura del Sistema

## 📌 Enfoque
Arquitectura basada en capas siguiendo buenas prácticas de Spring Boot.

---

## 🧱 Capas

### Controller
- expone endpoints REST
- valida inputs
- maneja requests/responses

### Service
- lógica de negocio
- validaciones
- reglas

### Repository
- acceso a datos
- JPA

---

## 📦 Estructura
com.dmgdev.taskmanager
│
├── controller
├── service
├── repository
├── entity
├── dto
├── mapper
├── security
├── config
└── exception

---

## 🔐 Seguridad

- autenticación JWT
- stateless
- Spring Security

---

## 🗄️ Persistencia

- PostgreSQL
- JPA/Hibernate

---

## 🔄 Flujo

Request → Controller → Service → Repository → DB  
Response ← Controller

---

## 📌 Decisiones técnicas

### JWT
- escalable
- stateless
- estándar REST

### PostgreSQL
- robusto
- relacional

### JPA
- integración con Spring
- simplificación ORM

---

## 🚀 Escalabilidad

El sistema está preparado para:
- añadir nuevas entidades
- ampliar lógica de negocio
- evolucionar a microservicios