import PropTypes from "prop-types";
import BoardSpace from "./BoardSpace.jsx";
import { BOARD_SIDE } from "../data/boardSpaces.js";

export default function Board({ spaces, tokenPosition = 0 }) {
  // Segmentación de 16 espacios en: fila inferior, columna derecha, fila superior, columna izquierda
  const bottomLen = BOARD_SIDE; // 5
  const sideLen = BOARD_SIDE - 2; // 3

  const bottom = spaces.slice(0, bottomLen); // izquierda -> derecha
  const right = spaces.slice(bottomLen, bottomLen + sideLen); // abajo -> arriba
  const top = spaces.slice(bottomLen + sideLen, bottomLen + sideLen + bottomLen); // derecha -> izquierda
  const left = spaces.slice(bottomLen + sideLen + bottomLen); // arriba -> abajo

  // Para un recorrido horario, invertimos el orden visual de top para mantener la continuidad
  const topVisual = [...top].reverse(); // se mostrará izquierda -> derecha pero representa derecha -> izquierda
  // La columna derecha debe mostrarse de arriba -> abajo, por lo que invertimos right
  const rightVisual = [...right].reverse();
  // La columna izquierda ya está en orden arriba -> abajo
  const leftVisual = left;

  return (
    <div className="bg-blue-900/60 rounded-3xl p-1.5 sm:p-2.5 lg:p-3 shadow-2xl border border-blue-950/40">
      <div className="bg-blue-900/70 rounded-2xl p-1.5 sm:p-2.5 lg:p-3 border border-blue-950/40">
        {/* Tablero compuesto en 3 filas: superior, centro (izq+centro+der), inferior */}
        <div className="flex flex-col gap-0.5 sm:gap-1 lg:gap-1.5">
          {/* Fila superior */}
          <div className="flex gap-0.5 sm:gap-1 lg:gap-1.5 justify-between">
            {topVisual.map((space, idx) => {
              const globalIndex =
                bottomLen + sideLen + (bottomLen - 1 - idx); // índice real en el array original
              const showToken = tokenPosition === globalIndex;
              return <BoardSpace key={space.id} space={space} showToken={showToken} />;
            })}
          </div>

          {/* Franja central con columna izquierda y derecha */}
          <div className="flex gap-0.5 sm:gap-1 lg:gap-1.5">
            {/* Columna izquierda */}
            <div className="flex flex-col justify-between gap-0.5 sm:gap-1 lg:gap-1.5">
              {leftVisual.map((space, i) => {
                const globalIndex = bottomLen + sideLen + bottomLen + i;
                const showToken = tokenPosition === globalIndex;
                return <BoardSpace key={space.id} space={space} showToken={showToken} />;
              })}
            </div>

            {/* Zona central vacía (mesa) */}
            <div className="relative flex-1 rounded-xl bg-blue-800/40 border border-blue-950/40 min-h-[8rem] sm:min-h-[11rem] lg:min-h-[14rem] flex items-center justify-center overflow-hidden">
              {/* Decoración: estrellas */}
              <svg
                viewBox="0 0 100 100"
                className="absolute w-40 h-40 -left-6 -top-6 opacity-20 text-blue-200"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="50,10 61,35 88,38 67,55 72,82 50,68 28,82 33,55 12,38 39,35" />
              </svg>
              <svg
                viewBox="0 0 100 100"
                className="absolute w-32 h-32 -right-4 -bottom-4 opacity-15 text-blue-100"
                fill="currentColor"
                aria-hidden="true"
              >
                <polygon points="50,10 61,35 88,38 67,55 72,82 50,68 28,82 33,55 12,38 39,35" />
              </svg>
              <div className="relative text-center px-4">
                <h3 className="text-2xl sm:text-3xl font-semibold text-blue-200 tracking-wide drop-shadow">
                  Monopoly
                </h3>
                <p className="text-sm text-blue-100/80">de Derivadas</p>
              </div>
            </div>

            {/* Columna derecha */}
            <div className="flex flex-col justify-between gap-0.5 sm:gap-1 lg:gap-1.5">
              {rightVisual.map((space, i) => {
                const globalIndex = bottomLen + (sideLen - 1 - i);
                const showToken = tokenPosition === globalIndex;
                return <BoardSpace key={space.id} space={space} showToken={showToken} />;
              })}
            </div>
          </div>

          {/* Fila inferior */}
          <div className="flex gap-0.5 sm:gap-1 lg:gap-1.5 justify-between">
            {bottom.map((space, idx) => {
              const globalIndex = idx;
              const showToken = tokenPosition === globalIndex;
              return <BoardSpace key={space.id} space={space} showToken={showToken} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

Board.propTypes = {
  spaces: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  tokenPosition: PropTypes.number,
};


