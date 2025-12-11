const { execSync } = require("node:child_process");
const { mkdirSync, rmSync, existsSync, cpSync } = require("node:fs");
const { join, resolve } = require("node:path");

const root = process.cwd().replace(/[/\\]$/, "");
const outBase = join(root, "public", "projects");
const previewsBase = join(root, "previews");

// Raíces candidatas donde podrían vivir los otros proyectos.
// Prioridad:
// 1) PROJECTS_ROOT (variable de entorno)
// 2) ../CalculoProyecto (si el Portafolio está fuera del monorepo)
// 3) ../../ (si el Portafolio está dentro de /calculoapis/Portafolio)
// 4) ../ (fallback genérico)
const envRoot = process.env.PROJECTS_ROOT && process.env.PROJECTS_ROOT.trim();
const candidateRoots = [
  envRoot,
  resolve(root, "../CalculoProyecto"),
  resolve(root, "../../"),
  resolve(root, "../"),
].filter(Boolean);

function resolveExternalPath(relPath) {
  for (const base of candidateRoots) {
    const full = resolve(base, relPath);
    if (existsSync(full)) return full;
  }
  // Devuelve la primera ruta (desde envRoot/base guess) aunque no exista, para mensajes coherentes
  return resolve(candidateRoots[0] || root, relPath);
}

// Mapeo de proyectos → rutas relativas desde cada raíz candidata
const projects = [
  { name: "monopoly-derivadas", rel: "monopoly-derivadas" },
  { name: "drone-agricola", rel: "drone-agricola" },
  { name: "drone-submarino", rel: "drone-submarino" },
].map(p => ({ name: p.name, externalCandidates: candidateRoots.map(r => resolve(r, p.rel)) }));

function sh(cmd, cwd) {
  console.log(`$ ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd });
}

// Asegurar carpetas base
mkdirSync(outBase, { recursive: true });
mkdirSync(previewsBase, { recursive: true });

for (const p of projects) {
  const internal = join(previewsBase, p.name);

  // Determinar el primer origen existente
  const external = p.externalCandidates.find(existsSync) || p.externalCandidates[0];

  // Si no existe una copia interna, intenta copiar desde el origen externo
  if (!existsSync(internal)) {
    if (existsSync(external)) {
      console.log(`Copiando ${p.name} → previews/${p.name}`);
      try {
        cpSync(external, internal, { recursive: true });
      } catch (e) {
        console.warn(`No se pudo copiar ${p.name} desde ${external}:`, e?.message);
      }
    } else {
      console.warn(`Origen no encontrado para ${p.name}. Puedes agregarlo manualmente en previews/${p.name}`);
    }
  }

  // Si ya hay copia interna con package.json, intentar instalar y construir
  if (existsSync(join(internal, "package.json"))) {
    // Detectar si usa Vite para forzar base relativa './'
    let useVite = false;
    try {
      const pkg = require(join(internal, "package.json"));
      useVite = !!(pkg?.devDependencies?.vite || pkg?.dependencies?.vite);
    } catch {}
    try {
      sh("npm ci --no-audit --no-fund", internal);
    } catch {
      console.warn(`'npm ci' falló en ${p.name}, probando 'npm install'`);
      try { sh("npm install --no-audit --no-fund --loglevel=error", internal); } catch {}
    }
    try {
      if (useVite) {
        // Fuerza base relativa para que cargue dentro de /public/projects/<slug>/
        sh("npx -y vite build --base ./", internal);
      } else {
        sh("npm run build", internal);
      }
    } catch (e) {
      console.warn(`Build fallida en ${p.name}:`, e?.message);
    }
    const srcDist = join(internal, "dist");
    const dest = join(outBase, p.name);
    try {
      rmSync(dest, { recursive: true, force: true });
      mkdirSync(dest, { recursive: true });
      cpSync(srcDist, dest, { recursive: true });
      console.log(`Vista previa funcional lista: ${dest}`);
    } catch (e) {
      console.warn(`No se pudo copiar dist de ${p.name}. Verifica que exista ${srcDist}`);
    }
  } else {
    // Si no hay package.json interno, no se puede construir; dejamos lo que ya haya en public/projects
    console.warn(`No se encontró package.json en previews/${p.name}. Se omite su build.`);
  }
}

console.log("Previews: proceso completado. Salida en /public/projects");


