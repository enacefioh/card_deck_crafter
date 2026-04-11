# Card Deck Crafter

Un editor de cartas profesional, modular y fácil de usar para juegos de mesa y wargames.

## 🚀 Características

- **Zero Instalación**: Solo descarga, descomprime y abre `index.html`. Funciona directamente en tu navegador.
- **Formato .CDC**: Guarda y carga tus proyectos cómodamente.
- **Exportación Versátil**: Genera imágenes sueltas en PNG o archivos ZIP listos para imprimir.
- **Sistema Modular**: Crea tus propias plantillas de cartas con HTML y CSS.

## 🛠️ Estructura del Proyecto

El código ha sido refactorizado para seguir una arquitectura modular y profesional:

- `js/cdc-core.js`: Núcleo del motor y gestión del estado.
- `js/cdc-ui.js`: Control de la interfaz de usuario moderna.
- `js/cdc-cards.js`: Manipulación y lógica del ciclo de vida de las cartas.
- `js/cdc-menus.js`: Gestión de menús laterales y navegación.
- `js/cdc-editor.js`: Submenús de edición interactiva.
- `js/cdc-export.js`: Lógica de importación/exportación.

## 🎨 Creación de Plantillas

Puedes añadir nuevos módulos en la carpeta `modulos/`. Cada módulo debe registrarse en `CONFIG.js`. 
Consulta `docs_crear_plantillas.html` para una guía detallada sobre cómo crear tus propios diseños.

---
Desarrollado con ❤️ para la comunidad de juegos de mesa.
