# Cargar moodboards y publicar

El sitio funciona como un archivo vivo: subís imágenes a GitHub, una Action
genera el índice y Vercel vuelve a desplegar. No hay que editar código,
renombrar archivos ni tocar tamaños.

Las fotos pueden estar en `images/moodboards/` **o en la raíz del repositorio**:
el generador y el sitio aceptan las dos ubicaciones.

---

## 1. Cómo funciona

```
images/moodboards/  →  índice  →  moodboards.json  →  Vercel  →  universo 3D
   (tus fotos)        (tamaños)     (sin texto)         (deploy)
```

- **Carpeta recomendada**: `images/moodboards/`
- **Alternativa válida**: la raíz del repositorio (junto a `index.html`)
- **Índice generado**: `moodboards.json` (no editar a mano)
- **Generador**: `scripts/build-moodboards.mjs`
- **Vercel** lo ejecuta en cada deploy (`buildCommand` en `vercel.json`).
- **GitHub Action**: `.github/workflows/moodboards.yml` (opcional, mantiene el índice en el repo).
- **Sin imágenes**: el sitio muestra tarjetas neutras, sin frases ni títulos.

---

## 2. Subir imágenes desde GitHub (sin instalar nada)

1. Abrí el repositorio en GitHub.
2. Entrá a `images/moodboards/` (si no existe, creala con **Add file → Create
   new file** escribiendo `images/moodboards/.gitkeep`).
3. **Add file → Upload files**.
4. Arrastrá las fotos. Podés subir varias a la vez.
5. **Commit changes**.

La Action se ejecuta sola y actualiza `moodboards.json`. Además, **Vercel
ejecuta el mismo generador en cada deploy**, así que las fotos aparecen aunque
la Action no esté configurada. En uno o dos minutos el universo muestra las
imágenes nuevas.

> Si ya las subiste a la raíz del repositorio, también funcionan. No hace falta
> moverlas: el generador las detecta y el sitio prueba primero la ruta del
> índice y después la raíz.

> Si querés que la Action también deje el índice actualizado en el repo:
> **Settings → Actions → General → Workflow permissions → Read and write
> permissions**. Si no, Vercel lo genera igual al desplegar.

### Si preferís Git en tu computadora

```bash
git add images/moodboards moodboards.json
git commit -m "Nuevos moodboards"
git push
```

---

## 3. Nombres y orden

El universo **solo muestra las imágenes**: no dibuja títulos, frases ni
números encima. El nombre del archivo se usa únicamente para ordenar:

- `01-foto.webp`, `02-foto.webp`, … definen el orden.
- Sin número, se ordenan alfabéticamente.
- Formatos: **JPG, PNG, WebP, GIF o AVIF**.
- Se indexan hasta **60 imágenes**.
- La proporción se lee del tamaño real; la foto se muestra completa, sin
  deformarse.

### Ajustes manuales con `meta.json`

Si querés un título con tildes, cambiar la categoría u ocultar una foto, creá
`images/moodboards/meta.json`:

```json
{
  "replicas-ford.jpg": {
    "name": "Réplicas Ford 1930",
    "industry": "Infraestructura Visual",
    "kind": "Artesanía & Metal",
    "order": 1
  },
  "prueba-descartada.jpg": {
    "hidden": true
  }
}
```

Las claves son el nombre exacto del archivo. La Action vuelve a generar el
índice al detectar cambios en la carpeta.

---

## 4. Ver el sitio en local

Serví la carpeta por HTTP (no abras `index.html` con doble clic):

```bash
npx serve .
```

Después de agregar fotos, regenerá el índice localmente:

```bash
node scripts/build-moodboards.mjs
```

y recargá el navegador.

---

## 5. Publicar en Vercel

### Primera vez

1. Subí el proyecto a GitHub (con Git o con **Upload files**).
2. Entrá a [vercel.com/new](https://vercel.com/new) e importá el repositorio.
3. Configuración:
   - **Framework Preset**: `Other`
   - **Build Command**: `node scripts/build-moodboards.mjs`
   - **Output Directory**: `.`
   - **Install Command**: vacío
4. **Deploy**.

`vercel.json` ya trae esos valores; si Vercel muestra otros, dejá los del
archivo. El build solo regenera `moodboards.json` y no necesita dependencias.

Cada push a `main` —incluido el commit automático del índice— redespliega.
No hay que configurar nada más.

### Dominio propio

**Settings → Domains → Add** en Vercel, y seguí los registros DNS. Si el
dominio final no es `https://tallerzz.com/`, actualizá `robots.txt`,
`sitemap.xml` y las URLs de `index.html`.

### Publicar sin GitHub

```bash
npx vercel --prod
```

Esto sube la carpeta tal cual. El flujo automático de moodboards necesita
GitHub para que la Action genere el índice.

---

## 6. Problemas frecuentes

**Subí fotos y no cambian**
- Revisá **Actions** en GitHub: el workflow “Índice de moodboards” tiene que
  aparecer en verde.
- Si falla por permisos, activá **Read and write permissions** (sección 2).
- Las fotos pueden estar en `images/moodboards/` o en la raíz del repo. Si
  están en otro lado (por ejemplo `images/` suelta), movelas a una de esas dos.
- En Vercel, abrí el último deploy y confirmá que el **Build Command** sea
  `node scripts/build-moodboards.mjs`. Después de cambiar archivos, usá
  **Redeploy** sin caché.
- Si el deploy es viejo, revisá que el proyecto de Vercel apunte al repositorio
  y a la rama correctos (`main`).

**Una foto no aparece**
- Formato no soportado o archivo dañado. La Action lo informa en el log y
  sigue con el resto.
- Superaste el límite de 60 imágenes.

**Quiero volver a las placas base**
- Borrá las fotos de `images/moodboards/` y de la raíz, y además borrá (o vaciá)
  `moodboards.json`. Si el índice anterior sigue teniendo fotos, el generador
  lo conserva a propósito para no dejar la escena vacía por error de rutas.

---

## 7. Archivos del sistema

```text
index.html                     Página única con el canvas
styles.css                     Fondo blanco, sin interfaz
script.js                      Motor 3D y lectura del índice
moodboards.json                Índice generado (no editar)
images/moodboards/             Tus fotos (cualquier nombre)
*.webp / *.jpg / *.png         Alternativa: fotos en la raíz del repo
images/moodboards/meta.json    Overrides opcionales
scripts/build-moodboards.mjs   Generador del índice (lee ambas ubicaciones)
.github/workflows/             Action automática
vercel.json                    Configuración de deploy
```
