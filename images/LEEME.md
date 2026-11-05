# Imágenes

Las fotos del universo van en **`images/moodboards/`**. Podés usar cualquier
nombre de archivo: el título, la proporción y el orden se generan solos.

```
images/moodboards/
  ├── 01-replicas-ford.jpg
  ├── 02-retrato-founder.jpg
  ├── 03-campana-verano__Direccion de Arte__Editorial.jpg
  └── meta.json          (overrides opcionales)
```

1. Subí las imágenes desde GitHub (**Add file → Upload files**).
2. La Action ejecuta `scripts/build-moodboards.mjs` y actualiza
   `moodboards.json`.
3. Vercel redespliega el sitio automáticamente.

Si la carpeta está vacía, se muestran las 18 placas base generadas en canvas.

Guía completa: **`SUBIR.md`** en la raíz del proyecto.
