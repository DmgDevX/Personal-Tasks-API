# 📡 API Specification

## 🔐 Auth

### POST /api/auth/register
Crear usuario

### POST /api/auth/login
Login usuario

---

## 👤 User

### GET /api/users/me
Perfil del usuario

---

## 📂 Boards

### GET /api/boards
Listar boards

### POST /api/boards
Crear board

### GET /api/boards/{id}
Obtener board

### PUT /api/boards/{id}
Actualizar board

### DELETE /api/boards/{id}
Eliminar board

---

## 📋 Tasks

### GET /api/tasks
Listar tareas

Query params:
- boardId
- status
- priority
- search

---

### POST /api/tasks
Crear tarea

---

### GET /api/tasks/{id}
Obtener tarea

---

### PUT /api/tasks/{id}
Actualizar tarea

---

### DELETE /api/tasks/{id}
Eliminar tarea

---

## 📊 Ejemplo de filtro

GET /api/tasks?boardId=1&status=PENDING&page=0&size=10