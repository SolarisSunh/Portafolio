import { BOARD_SIDE } from "../data/boardSpaces.js";

export const TILE = 1;
export const GAP = 0.05;
export const STEP = TILE + GAP;
export const SIZE = (BOARD_SIDE - 1) * STEP; // longitud de un lado del anillo
export const HALF = SIZE / 2;

// Devuelve posición [x, y, z] para un índice del perímetro (anillo)
export function indexToPosition(index) {
  const perim = 4 * (BOARD_SIDE - 1);
  const i = ((index % perim) + perim) % perim;
  const bottomLen = BOARD_SIDE; // incluye esquinas
  const sideLen = BOARD_SIDE - 2;
  // bottom: 0..bottomLen-1 (izq->der)
  // right: bottomLen..bottomLen+sideLen-1 (abajo->arriba)
  // top: bottomLen+sideLen..bottomLen+sideLen+bottomLen-1 (der->izq)
  // left: resto (arriba->abajo)

  let x = 0;
  let z = 0;
  if (i < bottomLen) {
    // bottom row
    x = -HALF + i * STEP;
    z = HALF;
  } else if (i < bottomLen + sideLen) {
    // right column
    const k = i - bottomLen;
    x = HALF;
    z = HALF - (k + 1) * STEP;
  } else if (i < bottomLen + sideLen + bottomLen) {
    // top row (der -> izq)
    const k = i - (bottomLen + sideLen);
    x = HALF - k * STEP;
    z = -HALF;
  } else {
    // left column (arriba -> abajo)
    const k = i - (bottomLen + sideLen + bottomLen);
    x = -HALF;
    z = -HALF + (k + 1) * STEP;
  }
  return [x, 0, z];
}




