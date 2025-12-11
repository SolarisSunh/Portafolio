import PropTypes from "prop-types";
import { useEffect } from "react";

export default function ProblemReveal({ open, onComplete }) {
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      onComplete?.();
    }, 1100);
    return () => clearTimeout(t);
  }, [open, onComplete]);

  return (
    <div
      className={[
        "fixed inset-0 z-[60] transition-opacity duration-300",
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none invisible",
      ].join(" ")}
      aria-hidden={!open}
    >
      {/* Backdrop con destellos */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-900/60 via-blue-900/50 to-indigo-900/60" />
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] max-w-[92vw]">
          {/* Carta animada */}
          <div className="relative mx-auto aspect-[3/4] rounded-2xl shadow-2xl border border-amber-200 bg-amber-50 animate-cardIn transform-gpu">
            {/* Borde interior */}
            <div className="absolute inset-2 rounded-xl border border-amber-300" />
            {/* Brillo */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-0 left-0 h-full w-[40%] -skew-x-12 bg-white/20 blur-md animate-shine" />
            </div>
            {/* Contenido rápido */}
            <div className="relative h-full flex items-center justify-center text-center px-6">
              <div>
                <div className="text-amber-700 font-bold tracking-wide">¡Carta de Desafío!</div>
                <div className="text-neutral-800 mt-2 text-sm">Preparando problema...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

ProblemReveal.propTypes = {
  open: PropTypes.bool,
  onComplete: PropTypes.func,
};


