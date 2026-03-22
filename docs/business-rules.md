# 📌 Reglas de Negocio

## 🔐 Usuario

### Regla 1
Cada usuario solo puede acceder a sus propios datos.

---

## 📋 Tareas

### Regla 2
Toda tarea debe pertenecer a un único board.

### Regla 3
Una tarea no puede existir sin board.

### Regla 4
Una tarea pertenece a un único usuario.

---

## 📂 Boards

### Regla 5 (Eliminación en cascada)
Si un board es eliminado, todas las tareas asociadas a dicho board se eliminarán automáticamente en cascada.

### Regla 5.1
No pueden existir tareas sin board.

### Regla 5.2
La eliminación es definitiva (hard delete).

### Regla 5.3
Solo el propietario puede eliminar un board.

---

## 📊 Board General

### Regla 6
El sistema proporciona una vista general que muestra todas las tareas del usuario.

### Regla 7
El board general no es un contenedor real, sino una vista lógica.

### Regla 8
No se pueden asignar tareas al board general.

---

## 🔄 Estado de tareas

### Regla 9
Las tareas deben tener un estado válido:
- PENDING
- IN_PROGRESS
- DONE

---

## ⚠️ Integridad

### Regla 10
No se permitirá acceso a recursos de otros usuarios.

### Regla 11
Los identificadores deben ser válidos y existir.

---

## 🚫 Restricciones

- no hay tareas compartidas
- no hay múltiples boards por tarea
- no hay comentarios
- no hay roles complejos