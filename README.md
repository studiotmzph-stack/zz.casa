# Taller ZZ — Universo

Sitio estático de **Taller ZZ** (Tomás Zapata). Una sola pieza: el universo 3D de proyectos sobre fondo blanco. Sin header, sin archivo, sin menús ni textos: solo el sistema navegable.

> Estado actual: **16 imágenes cargadas** en `images/moodboards/`. El universo muestra solo las fotos, sin títulos ni frases encima.

## Familia de diseño

La página pertenece al sistema de **taller.zz // Dirección Visual**:

- **Tipografías**: Inter (base), Instrument Serif (títulos e itálicas), Geist Mono (micro-etiquetas).
- **Paleta**: monocroma, blanco puro de fondo, imágenes a todo color.
- **Placas**: tarjetas negras neutras solo como transición mientras carga cada foto. Sin texto.
- **Composición**: fondo blanco, solo el universo 3D. Sin header, menús, textos ni controles.

---

## 1. Ver en local

No necesita build ni dependencias npm. Servir la carpeta por HTTP:

```bash
npx serve .
```

Luego abrir la URL que indique la terminal.

### Interacción

- **Arrastrar**: orbitar el universo.
- **Rueda / pinza**: acercar y alejar.
- **Teclado**: flechas para rotar, `+` / `-` para zoom, `0` o `Home` para volver al inicio.
- **Doble click**: resetear la vista.

---

## 2. Cargar moodboards

1. Subir las fotos a `images/moodboards/` con **cualquier nombre** (desde GitHub: **Add file → Upload files**). También se aceptan en la raíz del repositorio.
2. `scripts/build-moodboards.mjs` busca en las dos ubicaciones, lee el tamaño real de cada imagen y genera `moodboards.json`.
3. Vercel ejecuta ese generador en cada deploy. La Action de GitHub también puede mantener el índice en el repo. Si una ruta del índice falla, el sitio prueba automáticamente la otra ubicación.

Reglas de nombre: número inicial para el orden y `meta.json` para overrides. Guía completa: **`SUBIR.md`**.

El universo muestra **solo las imágenes**: no hay títulos, frases ni numeración sobre las fotos.

Si la carpeta está vacía, no aparece ninguna frase: solo tarjetas neutras.

---

## 3. Publicar en GitHub + Vercel

Guía paso a paso, con y sin Git instalado: **`SUBIR.md`**.

Resumen: subir la carpeta a un repositorio de GitHub, importarlo en [vercel.com](https://vercel.com), elegir Framework Preset `Other` y dejar Build Command / Output Directory según `vercel.json` (`node scripts/build-moodboards.mjs` y `.`). También se puede publicar directo desde la terminal:

```bash
npx vercel --prod
```

---

## 4. Archivos

```text
index.html                     Página única: canvas a pantalla completa
styles.css                     Fondo blanco y canvas sin interfaz
script.js                      Placas neutras, lectura del índice y motor 3D
moodboards.json                Índice generado (Vercel o Action)
images/moodboards/             Fotos reales (cualquier nombre)
*.webp / *.jpg / *.png         Alternativa: fotos en la raíz del repo
scripts/build-moodboards.mjs   Generador del índice (lee ambas ubicaciones)
.github/workflows/             Action que actualiza el índice
vendor/three.min.js            Three.js r128 local (con fallback CDN)
favicon.svg                    Ícono del sitio
vercel.json                    Configuración de deploy y headers
SUBIR.md                       Guía de imágenes, GitHub y Vercel
```

---

Taller ZZ © 2026 · Dirección: Tomás Zapata · Buenos Aires — Global
