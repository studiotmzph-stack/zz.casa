/**
 * ==========================================================================
 *  TALLER ZZ — UNIVERSO
 * ==========================================================================
 *
 *  Solo el sistema 3D, sobre fondo blanco.
 *
 *  PARA AGREGAR TUS FOTOS
 *  --------------------------------------------------------------------------
 *  1. Subí las imágenes a /images/moodboards (recomendado) o a la raíz del
 *     repositorio, con cualquier nombre.
 *  2. GitHub Actions ejecuta scripts/build-moodboards.mjs y genera
 *     moodboards.json con las proporciones y el orden.
 *  3. El sitio lee ese índice automáticamente. Si una ruta falla, prueba la
 *     otra ubicación antes de descartar la foto. Si no hay índice o está
 *     vacío, muestra las 18 placas base generadas en canvas.
 *
 *  El sitio está pensado para publicarse como estático en Vercel.
 * ==========================================================================
 */

const CONFIG = {
  indexUrl: "moodboards.json",
  maxItems: 60
};

window.PROJECTS = [
  {
    id: "zz-01",
    name: "Réplicas Ford 1930",
    industry: "Infraestructura Visual",
    kind: "Artesanía & Metal",
    aspect: 1.4,
    desc: "Fotografía y dirección de arte para un constructor de réplicas clásicas. Eliminación del ruido visual de taller mecánico para elevarlo a estándar de obra de arte automotriz."
  },
  {
    id: "zz-02",
    name: "Retrato Founder: Consultor Tech",
    industry: "Retrato de Autor",
    kind: "Luz de Ventana",
    aspect: 0.75,
    desc: "Resolución de la asimetría de percepción. Se reemplazó la foto de stock con pose corporativa por un retrato en 35 mm con luz natural direccional que valida calma y autoridad."
  },
  {
    id: "zz-03",
    name: "Atelier de Café & Tueste",
    industry: "Marcas de Nicho",
    kind: "Edición 35mm",
    aspect: 1.0,
    desc: "Banco de activos sobrio: vapor, grano, texturas de arpillera y manos en proceso. Sin sobre-estilización publicitaria; el oficio habla por sí solo."
  },
  {
    id: "zz-04",
    name: "Cultura de Piel",
    industry: "Dirección de Arte",
    kind: "Set & Texturas",
    aspect: 0.7,
    desc: "Estudio de marroquinería y objetos de cuero. Composición con planos detalle y sombras profundas inspiradas en catálogos de diseño nórdico."
  },
  {
    id: "zz-05",
    name: "Auditoría: Diagnóstico Perceptivo",
    industry: "Infraestructura Visual",
    kind: "Curaduría de Perfil",
    aspect: 1.33,
    desc: "Reorganización de la presencia visual de un profesional con facturación alta pero imagen dispersa. Reducción a seis activos clave de máxima certeza."
  },
  {
    id: "zz-06",
    name: "Sastrería & Herencia",
    industry: "Marcas de Nicho",
    kind: "Retrato Editorial",
    aspect: 0.75,
    desc: "Detalle de lanas, tijeras y costuras manuales. Enfoque analógico con paleta de color Kodak Vision3 emulada en postproducción."
  },
  {
    id: "zz-07",
    name: "Arquitectura Brutalista",
    industry: "Dirección de Arte",
    kind: "Espacio & Luz",
    aspect: 1.45,
    desc: "Captura de líneas de hormigón y luz rasante. Demostración de criterio compositivo y rigor en el uso de la perspectiva."
  },
  {
    id: "zz-08",
    name: "Sesión 1 a 1: Odontología Estética",
    industry: "Retrato de Autor",
    kind: "Infraestructura Visual",
    aspect: 0.8,
    desc: "Desmitificación del consultorio clínico frío. Retratos del doctor en ambiente cálido, transmitiendo precisión quirúrgica y serenidad humana."
  },
  {
    id: "zz-09",
    name: "Hoja de Contacto 35mm",
    industry: "Edición 35mm",
    kind: "Laboratorio Analógico",
    aspect: 1.2,
    desc: "Muestra de proceso y descarte editorial. Enseñar cómo se elige el fotograma definitivo educa el ojo del cliente sobre el valor del criterio."
  },
  {
    id: "zz-10",
    name: "Estudio de Cerámica Contemporánea",
    industry: "Marcas de Nicho",
    kind: "Dirección de Arte",
    aspect: 0.7,
    desc: "Torno, arcilla cruda y piezas cocidas bajo luz de tarde. Enfoque táctil que permite justificar un ticket cuatro veces superior en el mercado internacional."
  },
  {
    id: "zz-11",
    name: "Abogado Penalista & Arbitraje",
    industry: "Retrato de Autor",
    kind: "Infraestructura Visual",
    aspect: 0.75,
    desc: "Eliminación de la clásica foto con biblioteca de fondo y brazos cruzados. Mirada honesta, traje sobrio y atmósfera cinematográfica que proyecta certidumbre."
  },
  {
    id: "zz-12",
    name: "Gastronomía de Fuegos",
    industry: "Marcas de Nicho",
    kind: "Edición 35mm",
    aspect: 1.4,
    desc: "Brasas, cuchillos forjados y humo denso. Captura con óptica fija y diafragma abierto para generar profundidad y textura palpable."
  },
  {
    id: "zz-13",
    name: "Directora Creativa & Moda",
    industry: "Retrato de Autor",
    kind: "Editorial",
    aspect: 0.7,
    desc: "Sesión en departamento de techos altos. Lenguaje visual inspirado en las publicaciones de Studio Nicholson y The Gentlewoman."
  },
  {
    id: "zz-14",
    name: "Objetos de Escritorio en Latón",
    industry: "Dirección de Arte",
    kind: "Bodegón Minimalista",
    aspect: 1.0,
    desc: "Composiciones geométricas sobre fondos neutros. Demuestra el rigor visual necesario para posicionar productos cotidianos como piezas de colección."
  },
  {
    id: "zz-15",
    name: "Estudio de Paisajismo & Vivero",
    industry: "Infraestructura Visual",
    kind: "Botánica & Escala",
    aspect: 1.35,
    desc: "Documentación de jardines privados y especies autóctonas. Curaduría que transforma un servicio de paisajismo en una experiencia de autor."
  },
  {
    id: "zz-16",
    name: "Luthier: Construcción de Cuerdas",
    industry: "Edición 35mm",
    kind: "Artesanía en Set",
    aspect: 0.8,
    desc: "Virutas de madera, barnices y herramientas centenarias. La documentación sobria del proceso como el activo de venta más persuasivo."
  },
  {
    id: "zz-17",
    name: "Financista & Venture Capital",
    industry: "Retrato de Autor",
    kind: "Infraestructura Visual",
    aspect: 0.75,
    desc: "Proyección de solvencia y bajo perfil. Tonos fríos sutiles, luz natural y lenguaje no verbal que genera confianza inmediata en inversores."
  },
  {
    id: "zz-18",
    name: "Laboratorio de Fragancias de Nicho",
    industry: "Marcas de Nicho",
    kind: "Dirección de Arte",
    aspect: 1.25,
    desc: "Pipetas de vidrio, esencias ámbar y tipografía sobria. Creación de un universo visual que traduce el aroma en deseo antes de ser probado."
  }
];

(() => {
  "use strict";

  /* ========================================================================
     01. Utilidades
     ======================================================================== */

  const pad2 = (value) => String(value).padStart(2, "0");
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

  /* ========================================================================
     02. Placas neutras de carga (sin texto)
     ======================================================================== */

  const PLATE = {
    top: "#141414",
    bottom: "#090909",
    line: "rgba(255, 255, 255, 0.14)",
    leak: "rgba(255, 255, 255, 0.055)"
  };

  function createFilmPlate(project) {
    const H = 820;
    const W = Math.max(620, Math.round(H * (project.aspect || 1)));
    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const radius = Math.round(Math.min(W, H) * 0.034);

    const roundedPath = (x, y, w, h, r) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y);
      ctx.quadraticCurveTo(x + w, y, x + w, y + r);
      ctx.lineTo(x + w, y + h - r);
      ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      ctx.lineTo(x + r, y + h);
      ctx.quadraticCurveTo(x, y + h, x, y + h - r);
      ctx.lineTo(x, y + r);
      ctx.quadraticCurveTo(x, y, x + r, y);
      ctx.closePath();
    };

    ctx.save();
    roundedPath(0, 0, W, H, radius);
    ctx.clip();

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, PLATE.top);
    bg.addColorStop(1, PLATE.bottom);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    const leak = ctx.createRadialGradient(W * 0.82, H * 0.12, 0, W * 0.82, H * 0.12, W * 0.85);
    leak.addColorStop(0, PLATE.leak);
    leak.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = leak;
    ctx.fillRect(0, 0, W, H);

    ctx.strokeStyle = PLATE.line;
    ctx.lineWidth = 1.5;
    roundedPath(0.75, 0.75, W - 1.5, H - 1.5, radius);
    ctx.stroke();

    for (let i = 0; i < 900; i += 1) {
      const x = Math.random() * W;
      const y = Math.random() * H;
      const light = Math.random() > 0.4;
      ctx.fillStyle = light ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)";
      ctx.fillRect(x, y, 1.4, 1.4);
    }

    ctx.restore();

    return canvas;
  }

  /* ========================================================================
     03. Proyectos
     ======================================================================== */

  const canvas = document.getElementById("gl");
  if (!canvas) return;

  let projects = [];

  // El mismo archivo puede estar en images/moodboards/ o en la raíz del repo.
  // Se intentan ambas ubicaciones antes de marcar la foto como fallida.
  const IMAGE_BASES = ["images/moodboards/", ""];

  function resolveImage(project) {
    return project.img || project.src || "";
  }

  function baseName(value) {
    const clean = String(value || "").split("?")[0].split("#")[0];
    const parts = clean.split("/");
    const last = parts[parts.length - 1] || "";
    try {
      return decodeURIComponent(last);
    } catch (error) {
      return last;
    }
  }

  function imageCandidates(project) {
    const src = resolveImage(project);
    const versionMatch = src.match(/\?[^#]*/);
    const version = versionMatch ? versionMatch[0] : "";
    const name = baseName(project.file) || baseName(src);
    const list = [];
    const push = (value) => {
      if (value && !list.includes(value)) list.push(value);
    };

    if (src) push(src);
    if (name) {
      IMAGE_BASES.forEach((base) => push(base + encodeURIComponent(name) + version));
    }

    return list;
  }

  function buildProjects(source) {
    return (Array.isArray(source) ? source : []).slice(0, CONFIG.maxItems).map((project, index) => {
      return {
        ...project,
        index,
        displayIndex: pad2(index + 1),
        aspect: clamp(Number(project.aspect) || 1, 0.4, 2.6),
        img: resolveImage(project),
        imgCandidates: imageCandidates(project),
        imgFailed: false,
        image: null,
        placeholderCanvas: null,
        scale: 1,
        hoverScale: 1
      };
    });
  }

  async function loadCatalog() {
    const fallback = buildProjects(window.PROJECTS || []);
    if (!CONFIG.indexUrl || typeof window.fetch !== "function") return fallback;

    try {
      const response = await fetch(CONFIG.indexUrl, { cache: "no-cache" });
      if (!response.ok) return fallback;

      const data = await response.json();
      const items = Array.isArray(data) ? data : data && data.items;
      if (!Array.isArray(items) || !items.length) return fallback;

      const catalog = buildProjects(items);
      return catalog.length ? catalog : fallback;
    } catch (error) {
      console.warn("taller.zz: no se pudo leer el índice de moodboards.", error);
      return fallback;
    }
  }

  /* ========================================================================
     04. Universo 3D
     ======================================================================== */

  const THREE = window.THREE;

  let renderer = null;
  let scene = null;
  let camera = null;
  let raycaster = null;
  let pointerNDC = null;
  let euler = null;
  let dust = null;
  let ringGroup = null;

  let baseCamZ = 30;
  let targetCamZ = 30;
  let zoom = 1;
  let rotX = -0.08;
  let rotY = 0.4;
  let targetRotX = -0.08;
  let targetRotY = 0.4;

  let dragging = false;
  let dragDistance = 0;
  let lastPointer = null;
  let hovered = null;
  let universeReady = false;
  let frameRequest = 0;
  let resizeQueued = false;

  const pointers = new Map();
  let pinchStartDistance = 0;
  let pinchStartZoom = 1;

  const UNIVERSE_RADIUS = 10.2;
  const MIN_ZOOM = 0.56;
  const MAX_ZOOM = 1.72;

  const INK = 0x0a0a0a;

  function cameraFov() {
    return window.innerWidth < 700 ? 55 : 46;
  }

  function initUniverse() {
    if (!THREE) {
      console.warn("Taller ZZ: Three.js no está disponible.");
      return;
    }

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: "high-performance"
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.5 : 2));
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      renderer.setClearColor(0xffffff, 1);

      scene = new THREE.Scene();
      scene.background = new THREE.Color(0xffffff);

      camera = new THREE.PerspectiveCamera(cameraFov(), window.innerWidth / window.innerHeight, 0.1, 320);
      raycaster = new THREE.Raycaster();
      pointerNDC = new THREE.Vector2();
      euler = new THREE.Euler();

      const radius = UNIVERSE_RADIUS;
      const count = Math.max(projects.length, 1);
      const goldenAngle = Math.PI * (3 - Math.sqrt(5));

      projects.forEach((project, index) => {
        const y = 1 - ((index + 0.5) / count) * 2;
        const radial = Math.sqrt(Math.max(0, 1 - y * y));
        const theta = goldenAngle * index;
        const jitter = 0.9 + ((index * 37) % 100) / 100 * 0.18;

        project.position = new THREE.Vector3(
          Math.cos(theta) * radial,
          y,
          Math.sin(theta) * radial
        ).multiplyScalar(radius * jitter);

        const texture = new THREE.CanvasTexture(project.placeholderCanvas);
        configureTexture(texture);

        const geometry = new THREE.PlaneGeometry(1, 1);
        const material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 1,
          fog: false,
          color: 0xffffff
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.copy(project.position);
        mesh.userData.project = project;
        mesh.renderOrder = 1;

        project.mesh = mesh;
        project.texture = texture;
        project.hoverScale = 1;
        project.opacity = 1;

        scene.add(mesh);
      });

      createAtmosphere();
      updateCameraFit(true);
      bindUniverseEvents();
      renderer.domElement.addEventListener("webglcontextlost", handleContextLost, false);

      universeReady = true;
      frameRequest = window.requestAnimationFrame(renderUniverse);
      window.setTimeout(loadProjectImages, reducedMotion ? 1200 : 900);
    } catch (error) {
      console.warn("Taller ZZ: WebGL no disponible.", error);
    }
  }

  function configureTexture(texture) {
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    if (renderer) texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    texture.needsUpdate = true;
  }

  function createAtmosphere() {
    // Polvo / partículas
    const dustCount = coarsePointer ? 260 : 460;
    const positions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i += 1) {
      const radius = UNIVERSE_RADIUS * (1.25 + Math.random() * 1.55);
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({
        color: new THREE.Color(INK),
        size: 0.055,
        transparent: true,
        opacity: 0.24,
        sizeAttenuation: true,
        depthWrite: false,
        fog: false
      })
    );
    scene.add(dust);

    // Anillos orbitales
    ringGroup = new THREE.Group();
    const ringColor = new THREE.Color(INK);
    const ringDefinitions = [
      { radius: UNIVERSE_RADIUS * 1.18, rx: 0, rz: 0.18, opacity: 0.12 },
      { radius: UNIVERSE_RADIUS * 1.44, rx: Math.PI / 2.6, rz: 0.4, opacity: 0.07 },
      { radius: UNIVERSE_RADIUS * 0.68, rx: Math.PI / 2, rz: 0, opacity: 0.06 }
    ];

    ringDefinitions.forEach((definition) => {
      const points = [];
      for (let i = 0; i < 160; i += 1) {
        const angle = (i / 160) * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.cos(angle) * definition.radius,
          0,
          Math.sin(angle) * definition.radius
        ));
      }
      const ring = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(points),
        new THREE.LineBasicMaterial({
          color: ringColor,
          transparent: true,
          opacity: definition.opacity,
          depthWrite: false,
          fog: false
        })
      );
      ring.rotation.x = definition.rx;
      ring.rotation.z = definition.rz;
      ringGroup.add(ring);
    });
    scene.add(ringGroup);
  }

  function textureFromImage(image, targetAspect) {
    const naturalWidth = image.naturalWidth || image.width;
    const naturalHeight = image.naturalHeight || image.height;
    if (!naturalWidth || !naturalHeight) return new THREE.CanvasTexture(image);

    const sourceAspect = naturalWidth / naturalHeight;
    const aspect = clamp(Number(targetAspect) || sourceAspect, 0.4, 2.6);
    const maxSide = Math.min(1800, renderer.capabilities.maxTextureSize);

    // Recorte central tipo "cover": la foto llena la placa sin deformarse.
    let sourceWidth = naturalWidth;
    let sourceHeight = naturalHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (sourceAspect > aspect) {
      sourceWidth = Math.round(naturalHeight * aspect);
      offsetX = Math.max(0, Math.round((naturalWidth - sourceWidth) / 2));
    } else if (sourceAspect < aspect) {
      sourceHeight = Math.round(naturalWidth / aspect);
      offsetY = Math.max(0, Math.round((naturalHeight - sourceHeight) / 2));
    }

    const scale = Math.min(1, maxSide / Math.max(sourceWidth, sourceHeight));
    const canvasWidth = Math.max(1, Math.round(sourceWidth * scale));
    const canvasHeight = Math.max(1, Math.round(sourceHeight * scale));

    const resizeCanvas = document.createElement("canvas");
    resizeCanvas.width = canvasWidth;
    resizeCanvas.height = canvasHeight;
    const context = resizeCanvas.getContext("2d");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(
      image,
      offsetX,
      offsetY,
      sourceWidth,
      sourceHeight,
      0,
      0,
      canvasWidth,
      canvasHeight
    );

    const texture = new THREE.CanvasTexture(resizeCanvas);
    configureTexture(texture);
    return texture;
  }

  function loadProjectImages() {
    const queue = projects.filter((project) => project.imgCandidates && project.imgCandidates.length);
    if (!queue.length) return;

    let cursor = 0;
    let active = 0;
    const maxConcurrent = 3;

    const attemptLoad = (project, attempt) => {
      const candidates = project.imgCandidates;

      if (attempt >= candidates.length) {
        project.imgFailed = true;
        active -= 1;
        console.warn("taller.zz: no se pudo cargar la imagen", candidates);
        loadNext();
        return;
      }

      const image = new Image();
      if (/^https?:\/\//i.test(candidates[attempt])) image.crossOrigin = "anonymous";
      image.decoding = "async";

      image.onload = () => {
        project.image = image;
        project.img = candidates[attempt];
        if (project.mesh) {
          const previous = project.mesh.material.map;
          const texture = textureFromImage(image, project.aspect);
          project.texture = texture;
          project.mesh.material.map = texture;
          project.mesh.material.needsUpdate = true;
          if (previous) previous.dispose();
        }
        active -= 1;
        loadNext();
      };

      image.onerror = () => {
        attemptLoad(project, attempt + 1);
      };

      image.src = candidates[attempt];
    };

    const loadNext = () => {
      while (active < maxConcurrent && cursor < queue.length) {
        const project = queue[cursor];
        cursor += 1;
        active += 1;
        attemptLoad(project, 0);
      }
    };

    loadNext();
  }

  function updateCameraFit(immediate = false) {
    if (!camera) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspect = width / height;
    const oldBase = baseCamZ;

    camera.aspect = aspect;
    camera.fov = cameraFov();
    camera.updateProjectionMatrix();

    const verticalFov = THREE.MathUtils.degToRad(camera.fov);
    const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
    const fitVertical = UNIVERSE_RADIUS / Math.tan(verticalFov / 2);
    const fitHorizontal = UNIVERSE_RADIUS / Math.tan(horizontalFov / 2);
    const factor = aspect < 0.9 ? 0.82 : 1.15;

    baseCamZ = Math.max(fitVertical, fitHorizontal) * factor;
    const ratio = oldBase > 0 ? targetCamZ / oldBase : 1;

    targetCamZ = clamp(baseCamZ * ratio, baseCamZ * MIN_ZOOM, baseCamZ * MAX_ZOOM);
    zoom = targetCamZ / baseCamZ;

    if (immediate || !camera.position.z) {
      camera.position.z = targetCamZ;
    }
  }

  function setZoom(nextZoom) {
    zoom = clamp(nextZoom, MIN_ZOOM, MAX_ZOOM);
    targetCamZ = baseCamZ * zoom;
  }

  function resetUniverse() {
    targetRotX = -0.08;
    targetRotY = 0.4;
    setZoom(1);
  }

  function setHovered(project) {
    hovered = project;
  }

  function pickProject(clientX, clientY) {
    if (!camera || !raycaster) return null;

    pointerNDC.set(
      (clientX / window.innerWidth) * 2 - 1,
      -(clientY / window.innerHeight) * 2 + 1
    );
    raycaster.setFromCamera(pointerNDC, camera);

    const meshes = projects.filter((project) => project.mesh).map((project) => project.mesh);
    const intersections = raycaster.intersectObjects(meshes, false);
    const project = intersections.length ? intersections[0].object.userData.project : null;
    setHovered(project);
    return project;
  }

  function renderUniverse(time) {
    frameRequest = window.requestAnimationFrame(renderUniverse);

    if (!universeReady || document.hidden) return;

    const elapsed = time * 0.001;

    if (!dragging && !reducedMotion && !hovered) {
      targetRotY += 0.00055;
    }

    rotX += (targetRotX - rotX) * 0.065;
    rotY += (targetRotY - rotY) * 0.065;
    camera.position.z += (targetCamZ - camera.position.z) * 0.08;

    euler.set(rotX, rotY, 0);

    if (dust) {
      dust.rotation.x = rotX * 0.45;
      dust.rotation.y = rotY * 0.45;
    }
    if (ringGroup) {
      ringGroup.rotation.x = rotX;
      ringGroup.rotation.y = rotY;
    }

    const cardHeight = window.innerWidth < 700 ? 3.0 : 3.3;
    const hasHover = Boolean(hovered);

    projects.forEach((project, index) => {
      project.hoverScale += ((hovered === project ? 1.065 : 1) - project.hoverScale) * 0.12;

      const scale = project.hoverScale;
      if (!project.mesh) return;

      project.mesh.position.copy(project.position).applyEuler(euler);
      project.mesh.position.y += Math.sin(elapsed * 0.7 + index * 1.7) * 0.075 * scale;
      project.mesh.lookAt(camera.position);
      project.mesh.scale.set(
        cardHeight * project.aspect * scale,
        cardHeight * scale,
        1
      );

      const dimmed = hasHover && hovered !== project;
      project.opacity += ((dimmed ? 0.42 : 1) - project.opacity) * 0.12;
      project.mesh.material.opacity = project.opacity;
    });

    renderer.render(scene, camera);
  }

  function bindUniverseEvents() {
    canvas.addEventListener("pointerdown", (event) => {
      if (event.button !== undefined && event.button !== 0 && event.pointerType === "mouse") return;
      canvas.focus({ preventScroll: true });
      pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (canvas.setPointerCapture) {
        try { canvas.setPointerCapture(event.pointerId); } catch (error) { /* noop */ }
      }

      if (pointers.size === 1) {
        dragging = true;
        dragDistance = 0;
        lastPointer = { x: event.clientX, y: event.clientY };
        canvas.classList.add("is-grabbing");
        setHovered(null);
      } else if (pointers.size === 2) {
        dragging = false;
        const points = Array.from(pointers.values());
        pinchStartDistance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        pinchStartZoom = zoom;
      }
    });

    canvas.addEventListener("pointermove", (event) => {
      if (pointers.has(event.pointerId)) {
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
      }

      if (pointers.size >= 2) {
        const points = Array.from(pointers.values());
        const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
        if (pinchStartDistance > 0 && distance > 0) {
          setZoom(pinchStartZoom * (pinchStartDistance / distance));
        }
        return;
      }

      if (dragging && lastPointer) {
        const deltaX = event.clientX - lastPointer.x;
        const deltaY = event.clientY - lastPointer.y;
        targetRotY += deltaX * 0.005;
        targetRotX = clamp(targetRotX + deltaY * 0.005, -1.2, 1.2);
        dragDistance += Math.abs(deltaX) + Math.abs(deltaY);
        lastPointer = { x: event.clientX, y: event.clientY };
        return;
      }

      if (event.pointerType === "mouse" || event.pointerType === "pen") {
        pickProject(event.clientX, event.clientY);
      }
    });

    const endPointer = (event) => {
      pointers.delete(event.pointerId);

      if (canvas.releasePointerCapture) {
        try { canvas.releasePointerCapture(event.pointerId); } catch (error) { /* noop */ }
      }

      if (pointers.size === 1) {
        const remaining = Array.from(pointers.values())[0];
        lastPointer = { x: remaining.x, y: remaining.y };
        dragging = false;
      } else if (pointers.size === 0) {
        dragging = false;
        canvas.classList.remove("is-grabbing");
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
          setHovered(null);
        }
      }
    };

    canvas.addEventListener("pointerup", endPointer);
    canvas.addEventListener("pointercancel", endPointer);
    canvas.addEventListener("pointerleave", () => {
      if (!dragging) setHovered(null);
    });

    canvas.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();
        setZoom(zoom + event.deltaY * 0.0012);
      },
      { passive: false }
    );

    canvas.addEventListener("dblclick", () => resetUniverse());

    canvas.addEventListener("keydown", (event) => {
      const key = event.key;
      if (key === "ArrowLeft") {
        event.preventDefault();
        targetRotY -= 0.16;
      } else if (key === "ArrowRight") {
        event.preventDefault();
        targetRotY += 0.16;
      } else if (key === "ArrowUp") {
        event.preventDefault();
        targetRotX = clamp(targetRotX - 0.1, -1.2, 1.2);
      } else if (key === "ArrowDown") {
        event.preventDefault();
        targetRotX = clamp(targetRotX + 0.1, -1.2, 1.2);
      } else if (key === "+" || key === "=") {
        event.preventDefault();
        setZoom(zoom - 0.1);
      } else if (key === "-" || key === "_") {
        event.preventDefault();
        setZoom(zoom + 0.1);
      } else if (key === "0" || key === "Home") {
        event.preventDefault();
        resetUniverse();
      }
    });

    window.addEventListener("resize", () => {
      if (resizeQueued) return;
      resizeQueued = true;
      window.requestAnimationFrame(() => {
        resizeQueued = false;
        if (!renderer) return;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.5 : 2));
        renderer.setSize(window.innerWidth, window.innerHeight, false);
        updateCameraFit(false);
      });
    });

    document.addEventListener("visibilitychange", () => {
      if (!document.hidden && universeReady) {
        window.cancelAnimationFrame(frameRequest);
        frameRequest = window.requestAnimationFrame(renderUniverse);
      }
    });
  }

  function handleContextLost(event) {
    event.preventDefault();
    universeReady = false;
  }

  /* ========================================================================
     05. Arranque
     ======================================================================== */

  function boot() {
    // Las placas usan tipografías de la familia: generarlas con las fuentes listas.
    loadCatalog().then((catalog) => {
      projects = catalog;
      projects.forEach((project) => {
        project.placeholderCanvas = createFilmPlate(project);
      });
      initUniverse();
    });
  }

  function whenReady(callback) {
    const loads = document.fonts && document.fonts.load
      ? [
          document.fonts.load('400 16px "Instrument Serif"'),
          document.fonts.load('italic 400 16px "Instrument Serif"'),
          document.fonts.load('500 16px "Geist Mono"'),
          document.fonts.load('400 16px "Inter"')
        ]
      : [];

    const fontsReady = Promise.all(loads)
      .then(() => (document.fonts ? document.fonts.ready : null))
      .catch(() => null);
    const timeout = new Promise((resolve) => window.setTimeout(resolve, 1600));

    Promise.race([fontsReady, timeout]).then(callback).catch(callback);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => whenReady(boot));
  } else {
    whenReady(boot);
  }
})();
