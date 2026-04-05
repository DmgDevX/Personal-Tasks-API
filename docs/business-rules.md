# 📌 Reglas de Negocio

## 🔐 Usuario

### Regla 1
Cada usuario solo puede acceder a sus propios datos.

### Regla 2
Cada usuario solo puede acceder a sus propios boards.

### Regla 3
Cada usuario solo puede acceder a sus propias tareas.

---

## 📂 Boards

### Regla 4
Cada board pertenece a un único usuario.

### Regla 5
Un usuario puede tener varios boards.

### Regla 6
Solo el propietario puede crear y consultar sus boards.

### Regla 7
Actualmente el sistema permite crear y listar boards, pero no editarlos ni eliminarlos.

---

## 📋 Tareas

### Regla 8
Toda tarea debe pertenecer a un único board.

### Regla 9
Una tarea no puede existir sin board.

### Regla 10
Cada tarea pertenece indirectamente a un único usuario a través de su board.

### Regla 11
Solo el propietario puede crear, consultar, actualizar, completar o eliminar sus tareas.

---

## ✅ Estado de tareas

### Regla 12
El estado funcional de una tarea se representa mediante el campo booleano `completed`.

### Regla 13
Una tarea puede estar:
- completada (`true`)
- no completada (`false`)

### Regla 14
El sistema dispone de una operación específica para marcar una tarea como completada.

---

## 🚦 Prioridad

### Regla 15
Toda tarea debe tener una prioridad válida.

### Regla 16
Las prioridades permitidas son:
- LOW
- MEDIUM
- HIGH

---

## 📅 Fecha límite

### Regla 17
La fecha límite de una tarea es opcional.

### Regla 18
Cuando se informa, puede usarse como criterio de filtrado.

---

## 📊 Vista general

### Regla 19
El sistema proporciona una vista general que muestra todas las tareas del usuario.

### Regla 20
La vista general no es un board persistido en base de datos, sino una consulta global sobre las tareas del usuario.

---

## 🔍 Filtros

### Regla 21
Las tareas del usuario pueden filtrarse por:
- completed
- priority
- dueDate

### Regla 22
Los filtros pueden combinarse entre sí en la vista global.

---

## ⚠️ Integridad

### Regla 23
No se permitirá acceso a recursos de otros usuarios.

### Regla 24
Los identificadores deben ser válidos y existir para operar con boards y tareas.

### Regla 25
No pueden crearse tareas sobre boards que no pertenezcan al usuario autenticado.

---

## 🚫 Restricciones

- no hay tareas compartidas
- no hay múltiples boards por tarea
- no hay comentarios
- no hay roles complejos
- no hay borrado de boards implementado actualmente
- no hay paginación
- no hay búsqueda por texto