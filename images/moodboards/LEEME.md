# Moodboards

Subí acá tus imágenes con **cualquier nombre**. El sitio muestra solo las
fotos: no dibuja títulos, frases ni números encima.

## Cómo se actualiza

- **Vercel** ejecuta `scripts/build-moodboards.mjs` en cada deploy y genera
  `moodboards.json` con el tamaño real de cada imagen.
- **GitHub Actions** (opcional) hace lo mismo y deja el índice actualizado en
  el repo.

Si subís fotos desde GitHub (**Add file → Upload files**), el próximo deploy
las toma automáticamente. Si no querés depender de la Action, también podés
subir el `moodboards.json` generado en la raíz.

## Reglas

- Número al inicio (`01-`, `02_`) para controlar el orden.
- Formatos: JPG, PNG, WebP, GIF o AVIF.
- Hasta 60 imágenes.
- La proporción se lee del tamaño real; no hace falta recortar.

## Ocultar una foto

Creá `images/moodboards/meta.json`:

```json
{
  "foto-descartada.webp": { "hidden": true }
}
```

También permite forzar el orden:

```json
{
  "cosmos_50002274.webp": { "order": 1 }
}
```

## Sin imágenes

Si la carpeta está vacía, el universo muestra tarjetas neutras, sin frases.
