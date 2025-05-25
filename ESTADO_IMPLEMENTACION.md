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

### Resumen

**Tienes implementado:**
- Login, registro, activación de cuenta, cambio de contraseña, marcar como importante, comentar, obtener reporte, resolver reporte, ver todas las categorías, cambiar estado de reporte, informes/PDF.

**Te falta o está incompleto:**
- Gestión de cuenta (editar/eliminar)
- Crear reporte
- Gestión de reportes (editar/eliminar)
- Obtener comentarios completos
- Obtener mis reportes
- Obtener reportes cercanos
- Notificaciones
- Todos los reportes (moderador)
- Gestión de categorías (crear/editar/eliminar)
- Tests JUnit
- API completa/documentada
- Spring Security completo
- Extras
