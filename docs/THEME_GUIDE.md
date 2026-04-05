# 🎨 Guía de Desarrollo de Temas (v1.0)
Esta guía detalla los requisitos técnicos y estructurales para crear temas compatibles con el editor visual del SaaS.

## 🛠 1. Requisitos Técnicos Obligatorios
- **Framework**: React + Next.js (Server Components por defecto).
- **Estilos**: Tailwind CSS (**Uso obligatorio de variables dinámicas**).
- **Peso Máximo**: 50 MB (archivo .zip final).
- **Formato de Imagen**: Assets en WebP o SVG. `preview.png` en 1200x800px.

---

## 📂 2. Estructura del Paquete (.zip)
El archivo debe descomprimirse en la siguiente jerarquía exacta:

```plaintext
/nombre-del-tema
├── manifest.json          # Datos de identidad del tema
├── config.json            # ESQUEMA DE EDICIÓN (Vital para el Editor)
├── preview.png            # Miniatura de la tienda
└── /components            # Carpeta de componentes React
    ├── layout.tsx         # Estructura principal (Header + Footer)
    ├── Hero.tsx           # Sección de impacto
    ├── ProductGrid.tsx    # Grilla de productos
    └── ...                # Otras secciones (Newsletter, Testimonios, etc.)
```

---

## 🎨 3. El Archivo config.json (Motor del Editor)
Este archivo define qué controles verá el usuario en el Dashboard para personalizar el tema.

### Ejemplo de estructura:
```json
{
  "theme_name": "Modern Minimal",
  "global_styles": {
    "colors": {
      "primary": "#000000",
      "background": "#FFFFFF",
      "text": "#333333"
    },
    "fonts": ["Inter", "Roboto"]
  },
  "sections": [
    {
      "id": "hero_section",
      "type": "hero",
      "label": "Banner Principal",
      "fields": {
        "title": { "type": "text", "default": "Nueva Colección" },
        "image": { "type": "image", "default": "/assets/hero-bg.jpg" },
        "button_text": { "type": "text", "default": "Comprar Ahora" }
      }
    }
  ]
}
```

---

## 🧱 4. Requisitos de las Secciones Editables
- **Componentes "Estúpidos"**: Cada componente en `/components` debe limitarse a renderizar los datos recibidos desde `config.json`.
- **TypeScript**: Extender siempre de la interfaz `BaseSection`.
- **Tailwind Dinámico**: Prohibido usar colores fijos (ej: `bg-blue-500`). Usa variables: `className="bg-[var(--primary)]"`.
- **Mobile-First**: Diseño responsivo obligatorio desde el breakpoint base.

---

## ✅ 5. Checklist de Pre-Vuelo
- [ ] ¿El archivo .zip pesa menos de 50MB?
- [ ] ¿El `manifest.json` tiene la versión correcta?
- [ ] ¿Todos los componentes en `/components` están exportados correctamente?
- [ ] ¿He probado la tienda en modo oscuro (si aplica)?
- [ ] ¿La imagen `preview.png` refleja el diseño actual en 1200x800px?
- [ ] ¿Las variables de Tailwind coinciden con las del `config.json`?

---

## 🚫 6. Prohibiciones (Motivos de Rechazo)
- Uso de `dangerouslySetInnerHTML`.
- Scripts externos de tracking (Google Analytics/Meta Pixel deben ir por el Dashboard).
- Librerías de animaciones pesadas (preferir Framer Motion o CSS nativo).
- Archivos `.env` o credenciales dentro del paquete.
