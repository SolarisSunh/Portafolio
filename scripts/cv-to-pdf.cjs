/*
 * Genera public/CV.pdf a partir de CV.md.
 * 1) Convierte el markdown a HTML con `marked` y lo envuelve en una plantilla con estilos.
 * 2) Usa Microsoft Edge en modo headless para imprimir el HTML a PDF.
 */
const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const { marked } = require("marked");

const root = path.resolve(__dirname, "..");
const mdPath = path.join(root, "CV.md");
const htmlPath = path.join(root, "scripts", "cv-temp.html");
const pdfPath = path.join(root, "public", "CV.pdf");

const md = fs.readFileSync(mdPath, "utf8");
const body = marked.parse(md);

const html = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<style>
  @page { size: A4; margin: 18mm 16mm; }
  * { box-sizing: border-box; }
  body {
    font-family: -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1f2937;
    line-height: 1.5;
    font-size: 12px;
    margin: 0;
  }
  h1, h2 { color: #111827; line-height: 1.25; }
  h2 { font-size: 16px; margin: 18px 0 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
  h1 { font-size: 22px; margin: 0 0 4px; }
  a { color: #2563eb; text-decoration: none; }
  ul { margin: 6px 0; padding-left: 18px; }
  li { margin: 2px 0; }
  p { margin: 6px 0; }
  strong { color: #111827; }
  code { background: #f3f4f6; padding: 1px 4px; border-radius: 4px; }
</style>
</head>
<body>
${body}
</body>
</html>`;

fs.writeFileSync(htmlPath, html, "utf8");

const edgeCandidates = [
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
];
const edge = edgeCandidates.find((p) => fs.existsSync(p));
if (!edge) {
  throw new Error("No se encontró msedge.exe");
}

execFileSync(edge, [
  "--headless",
  "--disable-gpu",
  "--no-pdf-header-footer",
  `--print-to-pdf=${pdfPath}`,
  `file:///${htmlPath.replace(/\\/g, "/")}`,
], { stdio: "inherit" });

fs.unlinkSync(htmlPath);
console.log("PDF generado en", pdfPath);
