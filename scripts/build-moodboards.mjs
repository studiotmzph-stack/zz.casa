#!/usr/bin/env node
/**
 * Genera moodboards.json a partir de las imágenes del proyecto.
 *
 * Busca en dos lugares:
 *   1. images/moodboards/  (recomendado)
 *   2. la raíz del repositorio (por si las fotos se subieron ahí)
 *
 * - No necesita dependencias: lee las dimensiones reales de JPG, PNG, WebP,
 *   GIF y AVIF directamente desde la cabecera del archivo.
 * - Deriva el título desde el nombre del archivo.
 * - Permite ajustes manuales con images/moodboards/meta.json.
 * - Si no encuentra ninguna imagen, conserva el índice anterior en vez de
 *   vaciarlo (evita que un error de rutas deje el universo sin fotos).
 *
 * Uso local:
 *   node scripts/build-moodboards.mjs
 */

import { readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INPUT_DIR = path.join(ROOT, "images", "moodboards");
const OUTPUT_FILE = path.join(ROOT, "moodboards.json");
const MAX_ITEMS = 60;

const SUPPORTED = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

// Archivos de imagen del sitio que nunca son moodboards.
const IGNORED_ROOT_FILES = new Set([
  "apple-touch-icon.png",
  "favicon.png",
  "favicon.ico",
  "icon.png",
  "logo.png",
  "og-image.png",
  "preview.png",
  "screen.png",
  "screenshot.png",
  "thumbnail.png"
]);
const CONNECTORS = new Set([
  "a", "al", "con", "de", "del", "el", "en", "la", "las", "los",
  "para", "por", "sin", "sobre", "y"
]);

const collator = new Intl.Collator("es", { numeric: true, sensitivity: "base" });

function detectDimensions(buffer, extension) {
  if (extension === ".jpg" || extension === ".jpeg") return jpegDimensions(buffer);
  if (extension === ".png") return pngDimensions(buffer);
  if (extension === ".webp") return webpDimensions(buffer);
  if (extension === ".gif") return gifDimensions(buffer);
  if (extension === ".avif") return avifDimensions(buffer);
  return null;
}

function jpegDimensions(buffer) {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return null;
  let offset = 2;

  while (offset + 3 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }

    let marker = buffer[offset + 1];
    while (marker === 0xff) {
      offset += 1;
      marker = buffer[offset + 1];
    }
    offset += 2;

    if (marker === 0xd8 || marker === 0xd9 || marker === 0x01) continue;
    if (marker === 0xda) break;

    const length = buffer.readUInt16BE(offset);
    if (!length || offset + length > buffer.length) break;

    const isStartOfFrame =
      marker >= 0xc0 &&
      marker <= 0xcf &&
      marker !== 0xc4 &&
      marker !== 0xc8 &&
      marker !== 0xcc;

    if (isStartOfFrame) {
      const height = buffer.readUInt16BE(offset + 3);
      const width = buffer.readUInt16BE(offset + 5);
      if (width && height) return { width, height };
      return null;
    }

    offset += length;
  }

  return null;
}

function pngDimensions(buffer) {
  const signature = "89504e470d0a1a0a";
  if (buffer.length < 24 || buffer.subarray(0, 8).toString("hex") !== signature) return null;
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  return width && height ? { width, height } : null;
}

function gifDimensions(buffer) {
  if (buffer.length < 10) return null;
  const header = buffer.toString("ascii", 0, 6);
  if (header !== "GIF87a" && header !== "GIF89a") return null;
  const width = buffer.readUInt16LE(6);
  const height = buffer.readUInt16LE(8);
  return width && height ? { width, height } : null;
}

function webpDimensions(buffer) {
  if (buffer.length < 30) return null;
  if (buffer.toString("ascii", 0, 4) !== "RIFF") return null;
  if (buffer.toString("ascii", 8, 12) !== "WEBP") return null;

  const chunk = buffer.toString("ascii", 12, 16);

  if (chunk === "VP8X") {
    const width = 1 + buffer.readUIntLE(24, 3);
    const height = 1 + buffer.readUIntLE(27, 3);
    return width && height ? { width, height } : null;
  }

  if (chunk === "VP8 ") {
    const width = buffer.readUInt16LE(26) & 0x3fff;
    const height = buffer.readUInt16LE(28) & 0x3fff;
    return width && height ? { width, height } : null;
  }

  if (chunk === "VP8L") {
    const bits = buffer.readUInt32LE(21);
    const width = (bits & 0x3fff) + 1;
    const height = ((bits >> 14) & 0x3fff) + 1;
    return width && height ? { width, height } : null;
  }

  return null;
}

function avifDimensions(buffer) {
  const marker = buffer.indexOf(Buffer.from("ispe", "ascii"));
  if (marker === -1 || marker + 16 > buffer.length) return null;
  const width = buffer.readUInt32BE(marker + 8);
  const height = buffer.readUInt32BE(marker + 12);
  return width && height ? { width, height } : null;
}

function titleFromSegment(segment) {
  const words = String(segment)
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

  return words
    .map((word, index) => {
      if (/^[A-Z0-9]{2,6}$/.test(word)) return word;
      const lower = word.toLocaleLowerCase("es");
      if (index > 0 && CONNECTORS.has(lower)) return lower;
      return lower.charAt(0).toLocaleUpperCase("es") + lower.slice(1);
    })
    .join(" ");
}

function parseFileName(fileName) {
  const base = fileName.replace(/\.[^.]+$/, "");
  const [main, industry, kind] = base.split("__");

  const orderMatch = main.match(/^(\d{1,3})[\s._-]+/);
  const order = orderMatch ? Number(orderMatch[1]) : null;
  const titleSlug = orderMatch ? main.slice(orderMatch[0].length) : main;

  return {
    name: titleFromSegment(titleSlug) || "Moodboard",
    industry: industry ? titleFromSegment(industry) : "Moodboard",
    kind: kind ? titleFromSegment(kind) : "Archivo visual",
    order
  };
}

async function readOverrides() {
  try {
    const raw = await readFile(path.join(INPUT_DIR, "meta.json"), "utf8");
    const data = JSON.parse(raw.replace(/^\uFEFF/, ""));
    return data && typeof data === "object" ? data : {};
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.warn("meta.json inválido, se ignora:", error.message);
    }
    return {};
  }
}

async function listDirectory(directory, base) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }

  return entries
    .filter((entry) => entry.isFile() && SUPPORTED.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => ({
      fileName: entry.name,
      relative: base ? base + "/" + entry.name : entry.name
    }));
}

async function listImages() {
  const seen = new Set();
  const collected = [];

  const push = (entry) => {
    const key = entry.fileName.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);
    collected.push(entry);
  };

  // Primero la carpeta dedicada; si un archivo se repite en la raíz, gana esta.
  (await listDirectory(INPUT_DIR, "images/moodboards")).forEach(push);

  // Después la raíz del repo, ignorando íconos y capturas del sitio.
  (await listDirectory(ROOT, "")).forEach((entry) => {
    if (IGNORED_ROOT_FILES.has(entry.fileName.toLowerCase())) return;
    push(entry);
  });

  return collected;
}

async function main() {
  const files = await listImages();
  const overrides = await readOverrides();
  const items = [];
  const skipped = [];

  for (const entry of files) {
    const fileName = entry.fileName;
    const override = overrides[fileName] || {};

    if (override.hidden) continue;

    const extension = path.extname(fileName).toLowerCase();
    let dimensions = null;
    let version = "";

    try {
      const buffer = await readFile(path.join(ROOT, ...entry.relative.split("/")));
      dimensions = detectDimensions(buffer, extension);
      version = createHash("sha256").update(buffer).digest("hex").slice(0, 8);
    } catch (error) {
      skipped.push(`${fileName} (${error.message})`);
      continue;
    }

    if (!dimensions) {
      skipped.push(`${fileName} (no se pudieron leer las dimensiones)`);
      continue;
    }

    const parsed = parseFileName(fileName);
    const aspect = Number((dimensions.width / dimensions.height).toFixed(3));
    const order = Number.isFinite(Number(override.order))
      ? Number(override.order)
      : parsed.order;

    items.push({
      id: `mb-${String(items.length + 1).padStart(2, "0")}`,
      name: override.name ? String(override.name) : parsed.name,
      industry: override.industry ? String(override.industry) : parsed.industry,
      kind: override.kind ? String(override.kind) : parsed.kind,
      desc: override.desc ? String(override.desc) : "",
      file: fileName,
      src: entry.relative.split("/").map(encodeURIComponent).join("/") + (version ? "?v=" + version : ""),
      aspect,
      width: dimensions.width,
      height: dimensions.height,
      order: order === null || order === undefined ? null : order
    });
  }

  items.sort((a, b) => {
    const orderA = a.order === null ? Number.POSITIVE_INFINITY : a.order;
    const orderB = b.order === null ? Number.POSITIVE_INFINITY : b.order;
    if (orderA !== orderB) return orderA - orderB;
    return collator.compare(a.file, b.file);
  });

  const limited = items.slice(0, MAX_ITEMS);
  limited.forEach((item, index) => {
    item.id = `mb-${String(index + 1).padStart(2, "0")}`;
  });

  const payload = {
    version: 1,
    count: limited.length,
    items: limited
  };

  const output = JSON.stringify(payload, null, 2) + "\n";
  let previous = "";
  try {
    previous = await readFile(OUTPUT_FILE, "utf8");
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }

  // Si no se encontró ninguna imagen, no pisar un índice que sí tenía fotos:
  // es más probable que sea un problema de rutas que un vaciado intencional.
  if (!limited.length && previous) {
    let previousCount = 0;
    try {
      const previousData = JSON.parse(previous.replace(/^\uFEFF/, ""));
      previousCount = Array.isArray(previousData && previousData.items)
        ? previousData.items.length
        : 0;
    } catch (error) {
      previousCount = 0;
    }

    if (previousCount > 0) {
      console.warn(
        `No se encontraron imágenes, pero moodboards.json ya tiene ${previousCount}. Se conserva el índice anterior.`
      );
      return;
    }
  }

  if (previous !== output) {
    await writeFile(OUTPUT_FILE, output, "utf8");
    console.log(`moodboards.json actualizado: ${limited.length} imagen(es).`);
  } else {
    console.log(`moodboards.json sin cambios: ${limited.length} imagen(es).`);
  }

  if (items.length > MAX_ITEMS) {
    console.warn(`Se indexaron solo ${MAX_ITEMS} de ${items.length} imágenes (límite).`);
  }
  if (skipped.length) {
    console.warn("Archivos ignorados:");
    skipped.forEach((item) => console.warn(" - " + item));
  }
}

main().catch((error) => {
  console.error("Error generando el índice:", error);
  process.exitCode = 1;
});
