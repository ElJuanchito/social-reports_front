# Social reports

Social reports es una aplicación diseñada para facilitar la gestión de reportes comunitarios, permitiendo a los usuarios reportar incidentes, recibir notificaciones en tiempo real y colaborar con su comunidad.

## Funcionalidades

### Autenticación
- **Inicio de sesión**: Los usuarios pueden iniciar sesión proporcionando su correo electrónico y contraseña. Si el usuario no está activo, se redirige a la página de activación.
- **Registro de cuenta**: Los usuarios pueden crear una cuenta proporcionando su correo electrónico y otros datos necesarios.
- **Activación de cuenta**: 
  - Envío de un código de verificación al correo electrónico del usuario.
  - Verificación del código para activar la cuenta.
  - Reenvío del código de activación en caso de que el usuario no lo haya recibido.
  - Temporizador de 15 minutos para la validez del código de activación.
- **Gestión de tokens**: 
  - Al iniciar sesión, se guarda un token de autenticación en `localStorage`.
  - El token se utiliza para mantener la sesión activa.

### Navegación
- **Redirección automática**: 
  - Si no hay un token de autenticación, los usuarios son redirigidos automáticamente a la página de inicio de sesión.
  - Los usuarios no activos son redirigidos a la página de activación.
- **Barra de navegación**: Una barra de navegación personalizada para acceder a las diferentes secciones de la aplicación.

### Reportes
- **Reportes geolocalizados**: Los usuarios pueden reportar incidentes con precisión GPS y visualizarlos en un mapa interactivo.
- **Categorías de reportes**: Los reportes se pueden clasificar en categorías como seguridad, emergencias médicas, infraestructura, mascotas y comunidad.

### Notificaciones
- **Notificaciones en tiempo real**: Los usuarios reciben alertas instantáneas sobre incidentes cercanos a su ubicación.

### Interfaz de usuario
- **Diseño responsivo**: La aplicación está optimizada para dispositivos móviles y de escritorio.
- **Componentes reutilizables**: Uso de componentes como `FeatureCard`, `CategoryCard` y `Footer` para una experiencia de usuario consistente.
- **Animaciones**: Animaciones suaves utilizando la librería `framer-motion`.

### Mapas
- **Búsqueda de direcciones**: Integración con Mapbox para buscar direcciones y obtener coordenadas geográficas.
- **Geocodificación**: Conversión de direcciones en coordenadas para facilitar la ubicación en el mapa.

### Seguridad
- **Protección de rutas**: Las rutas protegidas requieren un token de autenticación válido para acceder.
- **Gestión de errores**: Manejo de errores con mensajes claros para el usuario, como "Usuario no encontrado" o "Código inválido o expirado".

## Tecnologías utilizadas
- **Frontend**: React, Next.js
- **Estilos**: CSS, TailwindCSS
- **Mapas**: Mapbox
- **Animaciones**: Framer Motion
- **Iconos**: React Icons
- **Estado global**: Context API

## Instalación
1. Clona este repositorio.
2. Instala las dependencias con `npm install`.
3. Configura las variables de entorno en un archivo `.env.local`:
   ```env
   NEXT_PUBLIC_MAPBOX_TOKEN=tu_token_de_mapbox