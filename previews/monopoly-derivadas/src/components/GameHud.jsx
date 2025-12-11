import PropTypes from "prop-types";
import Dice from "./Dice.jsx";

export default function GameHud({ money = 1500, hits = 0, dice = [0, 0], rolling = false, onRoll, eventProb = 0, apiStatus = "idle", onCheckBackend }) {
  const total = (dice?.[0] || 0) + (dice?.[1] || 0);
  const probPercent = Math.round((eventProb || 0) * 100);
  return (
    <aside className="w-full sm:w-80 bg-neutral-50/95 text-neutral-900 rounded-2xl shadow-xl border border-neutral-200 p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-emerald-800">
          Monopoly de Derivadas
        </h2>
        <p className="text-sm text-neutral-600">
          ¡Practica derivadas mientras juegas!
        </p>
      </div>
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Dinero</span>
          <span className="font-semibold">${money}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Turno</span>
          <span className="font-semibold">Jugador 1</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Aciertos</span>
          <span className="font-semibold">{hits}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Prob. evento</span>
          <span className="font-semibold">{probPercent}%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Backend</span>
          <span className={
            apiStatus === "ok" ? "text-emerald-700 font-semibold" :
            apiStatus === "fail" ? "text-rose-700 font-semibold" :
            "text-neutral-500"
          }>
            {apiStatus === "ok" ? "OK" : apiStatus === "fail" ? "ERROR" : "—"}
          </span>
        </div>
      </div>
      <div className="mt-6 space-y-4">
        <Dice values={dice} rolling={rolling} />
        <div className="text-sm text-neutral-600 text-center">
          {total > 0 ? `Resultado: ${dice[0]} + ${dice[1]} = ${total}` : "Lanza los dados"}
        </div>
        <button
          onClick={onRoll}
          disabled={rolling}
          className="w-full inline-flex items-center justify-center rounded-xl bg-red-600 text-white font-semibold py-3.5 text-base shadow hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          type="button"
        >
          {rolling ? "Moviendo..." : "Lanzar dados"}
        </button>
        <button
          onClick={onCheckBackend}
          className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 text-white font-semibold py-3 text-base shadow hover:bg-blue-700 transition-colors"
          type="button"
        >
          Validar backend
        </button>
      </div>
    </aside>
  );
}

GameHud.propTypes = {
  money: PropTypes.number,
  hits: PropTypes.number,
  dice: PropTypes.arrayOf(PropTypes.number),
  rolling: PropTypes.bool,
  onRoll: PropTypes.func,
  eventProb: PropTypes.number,
  apiStatus: PropTypes.string,
  onCheckBackend: PropTypes.func,
};


