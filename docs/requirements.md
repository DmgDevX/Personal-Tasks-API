# 📌 Requisitos del Proyecto

## 🧩 Descripción
El proyecto consiste en desarrollar una API REST para la gestión personal de tareas organizadas por boards. Cada usuario podrá gestionar sus propias tareas de forma individual, sin funcionalidades colaborativas.

---

## 🎯 Objetivo
Construir una API backend robusta que permita:
- gestionar tareas personales
- organizarlas mediante boards
- aplicar filtros y búsquedas
- implementar autenticación segura mediante JWT

---

## ✅ Requisitos funcionales

### RF-01. Autenticación
- registro de usuario
- login
- generación de JWT
- acceso a perfil autenticado

---

### RF-02. Boards
- crear board
- listar boards
- eliminar board
- consultar tareas de un board

---

### RF-03. Tareas
- crear tarea
- actualizar tarea
- eliminar tarea
- marcar como completada
- marcar como pendiente
- mover tarea entre boards

---

### RF-04. Organización
- asignar tareas a boards
- filtrar por:
  - estado
  - prioridad
  - board
  - fecha límite
- búsqueda por texto
- paginación
- ordenación

---

### RF-05. Vista General
- consultar todas las tareas del usuario
- aplicar filtros globales

---

## ⚙️ Requisitos no funcionales

### Seguridad
- autenticación JWT
- contraseñas cifradas
- acceso restringido por usuario

### Arquitectura
- arquitectura por capas
- uso de DTOs
- separación controller/service/repository

### Persistencia
- PostgreSQL
- JPA / Hibernate

### Documentación
- Swagger/OpenAPI
- README

### Testing
- tests unitarios
- tests de integración básicos

---

## 🚧 Alcance

### Incluido
- backend completo
- autenticación
- boards y tareas
- filtros y paginación

### No incluido
- frontend
- colaboración entre usuarios
- comentarios
- notificaciones
- adjuntos
- tiempo real
- integraciones externas

---

## 🚀 MVP

- autenticación JWT
- CRUD de boards
- CRUD de tareas
- filtros básicos
- paginación
- Swagger