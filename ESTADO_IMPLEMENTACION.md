# Estado de Implementación - Social Reports

## Cliente (Usuario)

- **Login:** OK
- **Registro:** OK
- **Gestión cuenta (obtener, editar, eliminar):** INCOMPLETO (falta implementar o terminar endpoints y UI para editar/eliminar cuenta)
- **Activar cuenta:** OK
- **Cambiar contraseña:** OK
- **Crear reporte:** INCOMPLETO (falta terminar la lógica de creación de reportes)
- **Gestión reportes (editar, eliminar):** INCOMPLETO (falta editar/eliminar reportes desde la UI y backend)
- **Marcar como Importante:** OK
- **Comentar en un reporte:** OK
- **Obtener reporte:** OK
- **Obtener comentarios:** INCOMPLETO (falta mostrar todos los comentarios de un reporte)
- **Resolver reporte:** OK
- **Obtener mis reportes:** FALTA (no hay endpoint ni UI para ver solo los reportes del usuario)
- **Obtener reportes cercanos:** FALTA (no está implementado el filtro por ubicación para reportes cercanos)
- **Notificaciones:** FALTA (no hay lógica de notificaciones implementada)

---

## Moderador

- **Todos los reportes (estado):** FALTA (no hay vista para ver todos los reportes y su estado)
- **Todas las categorías:** OK
- **Gestión Categorias (crear, editar, eliminar):** INCOMPLETO (falta terminar la gestión completa de categorías)
- **Cambiar estado (rechazar, verificar, resolver) - motivo:** OK
- **Informes (gráficas, informes, PDF):** OK (según tu lista, aunque puedes revisar si falta algún detalle)

---

## Otros

- **Tests JUnit:** INCOMPLETO (faltan pruebas unitarias)
- **API:** INCOMPLETO (faltan endpoints o documentación)
- **Spring Security:** INCOMPLETO (faltan detalles de seguridad en backend)
- **Extra 1:** FALTA
- **Extra 2:** FALTA

---

## ¿Qué tanto falta del proyecto?

Actualmente tienes implementadas las funciones básicas de autenticación, gestión mínima de reportes y categorías, y generación de informes. Sin embargo, aún falta una parte importante para considerar el proyecto como completo:

- **Faltan varias funciones clave para el usuario:** gestión completa de cuenta, creación y edición/eliminación de reportes, ver solo los reportes propios, reportes cercanos, notificaciones y mostrar todos los comentarios.
- **Para el moderador:** falta la vista de todos los reportes y la gestión completa de categorías.
- **A nivel técnico:** faltan pruebas unitarias, endpoints/documentación de la API, detalles de seguridad con Spring Security y extras opcionales.

**En resumen:**  
El proyecto está aproximadamente a un 60% de avance. Las bases están listas, pero faltan varias funcionalidades esenciales y detalles técnicos para considerarlo terminado y robusto.