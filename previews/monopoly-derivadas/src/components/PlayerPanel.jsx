import PropTypes from "prop-types";
import Dice from "./Dice.jsx";

export default function PlayerPanel({ player, isTurn, onRoll }) {
  const total = (player.dice?.[0] || 0) + (player.dice?.[1] || 0);
  return (
    <div className="rounded-2xl bg-neutral-50/95 border border-neutral-200 shadow p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: player.color }} />
          <span className="font-semibold text-neutral-900">{player.name}</span>
        </div>
        <div className="text-sm text-neutral-600">{isTurn ? "Tu turno" : ""}</div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-neutral-600">Dinero</div>
        <div className="font-semibold">${player.money}</div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <div className="text-neutral-600">Aciertos</div>
        <div className="font-semibold">{player.hits}</div>
      </div>
      <div className="space-y-2">
        <Dice values={player.dice} rolling={player.rolling} />
        <div className="text-center text-sm text-neutral-600">
          {total > 0 ? `Resultado: ${player.dice[0]} + ${player.dice[1]} = ${total}` : "—"}
        </div>
      </div>
      <button
        onClick={onRoll}
        disabled={!isTurn || player.rolling}
        className="w-full inline-flex items-center justify-center rounded-xl bg-red-600 text-white font-semibold py-2.5 text-base shadow hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        Lanzar dados
      </button>
    </div>
  );
}

PlayerPanel.propTypes = {
  player: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    money: PropTypes.number.isRequired,
    hits: PropTypes.number.isRequired,
    dice: PropTypes.arrayOf(PropTypes.number),
    rolling: PropTypes.bool,
  }),
  isTurn: PropTypes.bool,
  onRoll: PropTypes.func,
};


