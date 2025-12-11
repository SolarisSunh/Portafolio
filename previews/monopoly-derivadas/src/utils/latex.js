// Utilities to normalize our plain-text math into LaTeX for KaTeX rendering

function replaceSqrt(text) {
  return text.replace(/sqrt\s*\(([^()]+)\)/gi, (_m, inner) => `\\sqrt{${inner}}`);
}

function replaceLn(text) {
  // Convert 'ln' to '\ln' when not already escaped
  return text.replace(/(?<!\\)\bln\b/gi, '\\\\ln');
}

function replaceLogBase(text) {
  // Convert 'log_a(' into '\log_{a}('
  return text.replace(/log_([a-zA-Z0-9]+)\s*\(/g, (_m, base) => `\\\\log_{${base}}(`);
}

function replaceDot(text) {
  return text.replace(/·/g, '\\\\cdot ');
}

function replaceFractionsSimple(text) {
  // Simple patterns commonly used in our dataset:
  // 1/(...) -> \frac{1}{...}
  text = text.replace(/\b1\s*\/\s*\(([^()]+)\)/g, (_m, inner) => `\\\\frac{1}{${inner}}`);
  // (A)/(B) -> \frac{A}{B}
  text = text.replace(/\(\s*([^()]+?)\s*\)\s*\/\s*\(\s*([^()]+?)\s*\)/g, (_m, a, b) => `\\\\frac{${a}}{${b}}`);
  return text;
}

export function latexFromPlain(input) {
  if (!input) return '';
  let out = String(input);
  out = replaceSqrt(out);
  out = replaceLn(out);
  out = replaceLogBase(out);
  out = replaceDot(out);
  out = replaceFractionsSimple(out);
  return out;
}




