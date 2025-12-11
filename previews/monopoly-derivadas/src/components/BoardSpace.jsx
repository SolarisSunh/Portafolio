import PropTypes from "prop-types";
import PlayerToken from "./PlayerToken.jsx";

export default function BoardSpace({ space, showToken }) {
  const isProperty = space.type === "property";
  const base =
    "relative flex flex-col justify-between items-center text-center rounded-md border shadow-sm h-12 w-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 p-1 bg-blue-700/70 border-blue-900/60";

  return (
    <div className={base}>
      {/* Franja de color para propiedades */}
      <div
        className={`w-full h-3 rounded-sm ${isProperty ? space.color : "bg-blue-800/70"}`}
      />
      <div className="flex-1 flex items-center justify-center px-1">
        <span className="text-[9px] sm:text-[10px] font-semibold leading-tight">{space.name}</span>
      </div>
      {/* Zona inferior: pequeños detalles temáticos */}
      <div className="w-full flex items-center justify-center gap-1 pb-1">
        {space.type === "tax" && (
          <span className="text-[9px] text-amber-300">Impuesto</span>
        )}
        {space.type === "chance" && (
          <span className="text-[9px] text-sky-300">Suerte</span>
        )}
        {space.type === "go" && (
          <span className="text-[9px] text-blue-200">Salida</span>
        )}
        {space.type === "jail" && (
          <span className="text-[9px] text-slate-300">Cárcel</span>
        )}
      </div>

      {/* Ficha del jugador */}
      {showToken && (
        <div className="absolute -bottom-2">
          <PlayerToken />
        </div>
      )}
    </div>
  );
}

BoardSpace.propTypes = {
  space: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    color: PropTypes.string,
  }).isRequired,
  showToken: PropTypes.bool,
};


