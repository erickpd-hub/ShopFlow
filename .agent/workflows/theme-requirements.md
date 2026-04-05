---
description: Requisitos y validaciones para la creación de plantillas (Temas) del SaaS.
---

Este workflow define los estándares que debe seguir cualquier plantilla para ser validada por el sistema y el editor visual.

# 🚀 Pasos para Crear una Plantilla Compatible

1. **Definir Identidad**: Crear `manifest.json` con nombre, versión y autor.
2. **Diseñar el Esquema (config.json)**: Definir qué campos serán editables (texto, imagen, colores).
3. **Construir Componentes**:
   - Ubicar en la carpeta `/components`.
   - Usar Tailwind con variables dinámicas: `[var(--primary)]`.
   - Limitar lógica de estado externa; deben ser componentes puros.
4. **Capturar Miniatura**: Generar `preview.png` en resolución 1200x800px.
5. **Comprimir**: Crear un .zip con la estructura raíz exacta.

# 🔍 Reglas de Validación de Código (Strict Mode)

- **Tailwind**: Todos los colores primarios/secundarios deben referenciar variables de CSS dinámicas.
- **Seguridad**: No incluir `.env`, `.php`, o carpetas de dependencias como `node_modules`.
- **Peer-Deps**: No importar librerías externas que no estén en el core del SaaS (React, Framer Motion, Lucide, Tailwind).
- **URLs**: No usar URLs absolutas para imágenes externas; deben cargarse desde el dashboard o CDNs permitidos.

# 📦 Checklist de Entrega
- [ ] ZIP < 50MB
- [ ] Manifest v1.0.0+
- [ ] Preview 1200x800px
- [ ] Configura `config.json` con los mismos IDs que los props de los componentes.
