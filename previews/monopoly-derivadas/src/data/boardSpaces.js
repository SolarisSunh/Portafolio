export const BOARD_SIDE = 22; // 22 por lado => 84 casillas (4*(22-1))
import { getAllCardsForBoard } from "./derivativeCards.js";

// Paleta aproximada tipo Monopoly
const propertyColors = [
  "bg-red-600",
  "bg-blue-600",
  "bg-amber-500",
  "bg-purple-600",
  "bg-emerald-500",
  "bg-rose-600",
  "bg-cyan-600",
  "bg-lime-500",
  "bg-fuchsia-600",
  "bg-teal-500",
];

// Temas de propiedades (se irán ciclando)
const propertyTopics = [
  "Constantes / x",
  "Potencias",
  "Sumas / Restas",
  "Producto",
  "Cociente",
  "Raíces",
  "Logaritmos",
  "Exponenciales",
  "Regla Cadena",
  "Derivada Implícita",
];

function makeProperty(i, topicIndex) {
  const topic = propertyTopics[topicIndex % propertyTopics.length];
  const color = propertyColors[topicIndex % propertyColors.length];
  return { id: `s-${String(i).padStart(2, "0")}`, name: topic, type: "property", color };
}

// Genera el tablero en orden:
// - Fila inferior izquierda -> derecha (incluye las 2 esquinas)
// - Columna derecha abajo -> arriba (excluye esquinas)
// - Fila superior derecha -> izquierda (incluye las 2 esquinas)
// - Columna izquierda arriba -> abajo (excluye esquinas)
export const boardSpaces = (() => {
  const total = 4 * (BOARD_SIDE - 1); // 40 para BOARD_SIDE=11
  const bottomLen = BOARD_SIDE;
  const sideLen = BOARD_SIDE - 2;

  const bottom = new Array(bottomLen);
  const right = new Array(sideLen);
  const top = new Array(bottomLen);
  const left = new Array(sideLen);

  // Esquinas
  bottom[0] = { id: "s-00", name: "Salida", type: "go", color: "bg-emerald-700" };
  bottom[bottomLen - 1] = {
    id: `s-${String(bottomLen - 1).padStart(2, "0")}`,
    name: "Ir a Cárcel",
    type: "go-to-jail",
    color: "bg-red-700",
  };
  top[0] = {
    id: `s-${String(bottomLen + sideLen + bottomLen - 1).padStart(2, "0")}`,
    name: "Parking Libre",
    type: "free",
    color: "bg-emerald-600",
  };
  top[bottomLen - 1] = {
    id: `s-${String(bottomLen + sideLen + bottomLen + sideLen).padStart(2, "0")}`,
    name: "Cárcel (Visitas)",
    type: "jail",
    color: "bg-slate-700",
  };

  // Relleno con patrón: chance cada 5, tax cada 7, resto propiedades
  let globalIndex = 0;
  let topicIndex = 0;

  const pushWithRule = (arr, localIndex) => {
    const isAssigned = !!arr[localIndex];
    if (isAssigned) return; // esquinas ya asignadas
    globalIndex += 1;
    const id = `s-${String(globalIndex).padStart(2, "0")}`;
    if (globalIndex % 7 === 0) {
      arr[localIndex] = { id, name: "Impuesto", type: "tax", color: "bg-amber-600" };
    } else if (globalIndex % 5 === 0) {
      arr[localIndex] = { id, name: "Suerte", type: "chance", color: "bg-yellow-300" };
    } else {
      arr[localIndex] = makeProperty(globalIndex, topicIndex++);
    }
  };

  // Inferior (rellenar entre esquinas)
  for (let i = 1; i < bottomLen - 1; i++) pushWithRule(bottom, i);
  // Derecha (abajo -> arriba) sin esquinas
  for (let i = 0; i < sideLen; i++) pushWithRule(right, i);
  // Superior (derecha -> izquierda) relleno entre esquinas
  for (let i = 1; i < bottomLen - 1; i++) pushWithRule(top, i);
  // Izquierda (arriba -> abajo) sin esquinas
  for (let i = 0; i < sideLen; i++) pushWithRule(left, i);

  // Asegurar IDs únicos y longitud total
  const result = [...bottom, ...right, ...top, ...left];
  // Si por alguna razón faltaran elementos, completar con propiedades
  while (result.length < total) {
    result.push(makeProperty(result.length, topicIndex++));
  }

  const final = result.slice(0, total);

  // Asignar un problemId único a tantas casillas de propiedad como cartas haya
  const cards = getAllCardsForBoard();
  let assigned = 0;
  for (let i = 0; i < final.length && assigned < cards.length; i++) {
    if (final[i].type === "property") {
      final[i] = { ...final[i], problemId: cards[assigned].id };
      assigned += 1;
    }
  }
  return final;
})();


