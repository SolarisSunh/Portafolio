import PropTypes from "prop-types";
import { useMemo, useState } from "react";
import MathText from "./MathText.jsx";

export default function ChallengeCard({ card, onComplete }) {
  // Estados controlados por el padre a través de onComplete; aquí solo UI simple
  const { question, options, correctIndex, explanation, difficulty } = card || {};
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  // Extrae solo la expresión a derivar desde formatos tipo "d/dx ( ... )"
  const displayExpr = useMemo(() => {
    if (!question) return "";
    const trimmed = question.trim();
    const ddxMatch = trimmed.match(/^d\/dx\s*\((.*)\)$/i);
    if (ddxMatch && ddxMatch[1]) {
      return ddxMatch[1];
    }
    const ddxPrefix = trimmed.match(/^d\/dx\s+(.*)$/i);
    if (ddxPrefix && ddxPrefix[1]) {
      return ddxPrefix[1];
    }
    // Si no coincide, devolvemos tal cual
    return trimmed;
  }, [question]);

  function handleSelect(idx) {
    if (revealed) return;
    setSelected(idx);
  }

  function handleCheck() {
    if (selected == null) return;
    const ok = selected === correctIndex;
    setRevealed(true);
    // pequeña pausa para que se lea el estado y explicación antes de completar
    setTimeout(() => onComplete?.(ok), 650);
  }

  const correctText = options?.[correctIndex] ?? "";
  const isOk = revealed && selected === correctIndex;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wide text-emerald-900">
          Desafío de derivadas
        </span>
        {difficulty && (
          <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-white">
            {difficulty}
          </span>
        )}
      </div>
      <div className="text-sm text-neutral-700">
        <span className="font-semibold text-neutral-900">Deriva:</span>{" "}
        <span className="font-mono"><MathText text={displayExpr} /></span>
      </div>
      <div className="grid grid-cols-1 gap-2.5">
        {options?.map((opt, idx) => {
          const isCorrect = revealed && idx === correctIndex;
          const isWrong = revealed && idx === selected && idx !== correctIndex;
          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              className={[
                "w-full text-left px-4 py-2.5 rounded-lg border shadow-sm transition",
                selected === idx ? "border-emerald-500 ring-2 ring-emerald-200" : "border-neutral-200",
                isCorrect ? "bg-emerald-100" : "",
                isWrong ? "bg-rose-100" : "",
                revealed ? "cursor-default" : "hover:bg-neutral-50",
              ].join(" ")}
              disabled={revealed}
            >
              <MathText text={opt} />
            </button>
          );
        })}
      </div>
      <div className="pt-1">
        {!revealed ? (
          <button
            type="button"
            onClick={handleCheck}
            disabled={selected == null}
            className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-700 text-white font-semibold py-3 text-base shadow hover:bg-emerald-800 disabled:opacity-60"
          >
            Validar respuesta
          </button>
        ) : (
          <div className="space-y-1">
            <div className={`text-xs font-semibold ${isOk ? "text-emerald-700" : "text-rose-700"}`}>
              {isOk ? "¡Correcto!" : "Incorrecto"}
            </div>
            <div className="text-sm text-neutral-900">
              <span className="font-semibold">Derivada:</span>{" "}
              <span className="font-mono"><MathText text={correctText} /></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

ChallengeCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    difficulty: PropTypes.string,
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    correctIndex: PropTypes.number.isRequired,
    explanation: PropTypes.string,
  }),
  onComplete: PropTypes.func,
};


