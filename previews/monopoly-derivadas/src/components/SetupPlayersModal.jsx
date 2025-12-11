import PropTypes from "prop-types";
import { useState } from "react";

const defaultPlayers = [
  { name: "Jugador 1", color: "#f59e0b" },
  { name: "Jugador 2", color: "#10b981" },
  { name: "Jugador 3", color: "#3b82f6" },
  { name: "Jugador 4", color: "#ef4444" },
];

export default function SetupPlayersModal({ open, onStart }) {
  const [count, setCount] = useState(2);
  const players = defaultPlayers.slice(0, count);

  return (
    <div className={["fixed inset-0 z-[70]", open ? "opacity-100" : "opacity-0 pointer-events-none"].join(" ")}>
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl border border-neutral-200 p-6">
          <h3 className="text-xl font-semibold text-neutral-900">Configurar jugadores</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="text-sm text-neutral-700">Número de jugadores</label>
              <select
                className="mt-1 w-full rounded-lg border border-neutral-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
              >
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {players.map((p, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border p-3 flex items-center gap-3 shadow-sm"
                  style={{
                    backgroundColor: `${p.color}22`, // leve tinte del color del jugador
                    borderColor: p.color,
                  }}
                >
                  <div className="w-5 h-5 rounded-full ring-2 ring-white" style={{ backgroundColor: p.color }} />
                  <div className="text-sm font-semibold text-neutral-900">{p.name}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => onStart(players.map((p, i) => ({ id: i, name: p.name, color: p.color })))}
              className="w-full inline-flex items-center justify-center rounded-xl bg-blue-600 text-white font-semibold py-3 text-base shadow hover:bg-blue-700 transition-colors"
            >
              Comenzar partida
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

SetupPlayersModal.propTypes = {
  open: PropTypes.bool,
  onStart: PropTypes.func,
};


