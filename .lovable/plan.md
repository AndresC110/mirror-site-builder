## Plan: Sitio Team Abogados (versión profesional y rápida)

Recrear el sitio https://andresc110.github.io/Abogados-Page/ con el mismo contenido e imágenes, pero con un diseño legal más refinado y una carga inmediata.

### Estructura (rutas TanStack)
- `/` — Home con todas las secciones (Hero, ¿Accidente de Auto?, Reseñas, Contacto). Coincide con el original que es una sola página.
- Navegación con anclas: Servicios, Reseñas, Contacto.
- Selector de idioma EN | ES (placeholder visual; contenido inicial en ES igual que el original).

### Contenido (idéntico al original)
- **Hero**: "Team Abogados" / "Millones de Dólares Recuperados" / subtítulo NY / botones Llamar (833) 384-7375 y WhatsApp (link `https://wa.me/17184140102`).
- **¿Accidente de Auto?**: texto descriptivo + imagen Unsplash de justicia + tarjeta lateral "Revisamos su caso Gratis" con teléfono 718-414-0102 y CTA WhatsApp, "Atención 24/7 en el Bronx y todo NY".
- **Reseñas**: 4.9/5 en Google, 3 testimonios (Anónimo, Cliente Satisfecho, Usuario de Google) con texto exacto del original.
- **Contacto**: Oficina (2322 Arthur Avenue #207, Bronx, NY 10458), Teléfono (833) 384-7375, formulario (Nombre, Email, Teléfono, Área legal select, Mensaje, botón Enviar).
- **Footer**: Team Abogados.
- **Botón flotante WhatsApp** abajo a la derecha (como en el original).

### Diseño profesional (más pulido que el original)
- **Paleta**: navy oscuro `#0A1628` + dorado `#C9A24C` + crema `#F5F0E6` (paleta legal "Navy Trust" + "Noir Gold"). Tokens en `src/styles.css` en oklch.
- **Tipografía**: Headings serif elegante (Cormorant Garamond / Playfair Display) + cuerpo sans-serif (Inter). Tracking ajustado en eyebrows en mayúsculas.
- **Hero**: imagen full-bleed del Flatiron / skyline NY con overlay degradado oscuro, eyebrow dorado "TEAM ABOGADOS", H1 serif grande, dos CTAs (dorado primario + verde WhatsApp).
- **Secciones** con espaciado generoso, divisores finos dorados, tarjetas con sombra sutil y bordes redondeados pequeños (sensación legal seria, no startup).
- **Reseñas** con tarjetas elevadas, estrellas doradas, badge Google.
- **Formulario de contacto** con inputs limpios, labels visibles, focus dorado.
- **Responsive** mobile-first; navegación colapsa a menú móvil.

### Performance (carga rápida)
- Hero image: usar Unsplash con parámetros `w=1600&q=75&fm=webp&auto=format`, marcar `fetchpriority="high"` y `<link rel="preload" as="image">` en `head()` de la ruta `/`.
- Resto de imágenes con `loading="lazy"` y `decoding="async"`, `width`/`height` explícitos para evitar CLS.
- Fuentes vía Google Fonts con `display=swap` y `<link rel="preconnect">` a `fonts.googleapis.com` y `fonts.gstatic.com`.
- Sin librerías pesadas de animación; transiciones CSS y hovers nativos.
- Componentes shadcn ya disponibles (Button, Card, Input, Textarea, Select) — sin dependencias nuevas.
- SEO: title, meta description, og:title/description/image, H1 único, alt text en imágenes.

### Archivos a crear/editar
- `src/styles.css` — añadir tokens de color (navy, dorado, crema) e importar fuentes serif/sans.
- `src/routes/__root.tsx` — preconnect a Google Fonts, meta description del sitio.
- `src/routes/index.tsx` — head con title/description/preload del hero, render de secciones.
- `src/components/site/Header.tsx`, `Hero.tsx`, `AccidentSection.tsx`, `Reviews.tsx`, `Contact.tsx`, `Footer.tsx`, `WhatsAppFab.tsx`.

### Fuera de alcance
- Envío real del formulario (queda como UI con toast de confirmación; backend no solicitado).
- Traducción funcional EN/ES (solo selector visual; contenido en español como el original).
